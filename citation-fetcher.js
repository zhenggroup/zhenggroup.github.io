#!/usr/bin/env node
/**
 * citation-fetcher.js
 * 
 * Fetch citation counts from Semantic Scholar API (primary)
 * and Google Scholar profile (fallback).
 * 
 * This script is meant to be run by GitHub Actions on a schedule.
 * It updates js/citations-cache.json with citation counts for all publications.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load publication data
const publicationsDataPath = path.join(__dirname, 'js', 'publications-data.js');
let allPublications = [];

try {
  const dataContent = fs.readFileSync(publicationsDataPath, 'utf8');
  
  // Extract allPublications array using regex
  const match = dataContent.match(/const allPublications = \[([\s\S]*?)\];/);
  if (match) {
    // Use Function constructor to safely evaluate the array
    const code = `[${match[1]}]`;
    // This is a bit hacky but avoids require() issues
    allPublications = eval(code);
  }
} catch (error) {
  console.error('Failed to load publications data:', error);
  process.exit(1);
}

const LOG_PREFIX = '[Citation Fetcher]';
const SEMANTIC_SCHOLAR_API = 'https://api.semanticscholar.org/graph/v1/paper/DOI:';
const GOOGLE_SCHOLAR_URL = 'https://scholar.google.com.hk/citations?user=hEpBUuYAAAAJ&hl=en';

/**
 * Fetch citation count from Semantic Scholar API
 */
async function fetchFromSemanticScholar(doi) {
  return new Promise((resolve) => {
    const url = `${SEMANTIC_SCHOLAR_API}${encodeURIComponent(doi)}?fields=citationCount`;
    https.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const citations = json.citationCount || 0;
          resolve({ source: 'semantic-scholar', citations, success: true });
        } catch {
          resolve({ source: 'semantic-scholar', citations: null, success: false });
        }
      });
    }).on('error', () => {
      resolve({ source: 'semantic-scholar', citations: null, success: false });
    });
  });
}

/**
 * Fetch citation count from Google Scholar profile
 * Requires the profile page HTML to be parseable
 */
async function fetchFromGoogleScholar() {
  return new Promise((resolve) => {
    https.get(GOOGLE_SCHOLAR_URL, { timeout: 10000 }, (res) => {
      let html = '';
      res.on('data', chunk => { html += chunk; });
      res.on('end', () => {
        try {
          // Parse HTML to find citation counts by publication title
          // This is a best-effort approach; Google Scholar structure may change
          const citations = parseGoogleScholarProfile(html);
          if (citations && Object.keys(citations).length > 0) {
            resolve({ source: 'google-scholar', citations, success: true });
          } else {
            resolve({ source: 'google-scholar', citations: null, success: false });
          }
        } catch (error) {
          resolve({ source: 'google-scholar', citations: null, success: false });
        }
      });
    }).on('error', () => {
      resolve({ source: 'google-scholar', citations: null, success: false });
    });
  });
}

/**
 * Parse Google Scholar profile HTML to extract citation data
 * This is a simplified regex-based approach
 */
function parseGoogleScholarProfile(html) {
  const citations = {};
  
  // Look for citation count patterns in the HTML
  // Google Scholar typically shows: "Cited by: 42" or similar
  // This is fragile and depends on Google Scholar's HTML structure
  
  // Try to extract citation counts from table rows
  const rows = html.match(/<tr[^>]*>.*?<\/tr>/gs) || [];
  
  rows.forEach(row => {
    // Try to extract title and citation count
    const titleMatch = row.match(/<a[^>]*title="([^"]*)"[^>]*href="[^"]*"[^>]*>([^<]*)<\/a>/);
    const citMatch = row.match(/>(\d+)</);
    
    if (titleMatch && citMatch) {
      const title = titleMatch[1] || titleMatch[2];
      const citCount = parseInt(citMatch[1], 10);
      if (title && !Number.isNaN(citCount)) {
        // Normalize title for matching
        citations[title.toLowerCase().trim()] = citCount;
      }
    }
  });
  
  return citations;
}

/**
 * Match Google Scholar citations to our publications by title
 */
function matchGoogleScholarCitations(publications, googleCitations) {
  const result = {};
  
  publications.forEach(pub => {
    const pubTitle = pub.title.toLowerCase();
    
    // Try exact or fuzzy match
    let matched = false;
    
    for (const schTitle in googleCitations) {
      // Exact match
      if (pubTitle === schTitle) {
        result[pub.doi] = googleCitations[schTitle];
        matched = true;
        break;
      }
      
      // Fuzzy match: check if publication title is contained in Google Scholar title
      if (pubTitle.includes(schTitle) || schTitle.includes(pubTitle)) {
        result[pub.doi] = googleCitations[schTitle];
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      result[pub.doi] = null;
    }
  });
  
  return result;
}

/**
 * Main function
 */
async function main() {
  console.log(`${LOG_PREFIX} Starting citation fetch for ${allPublications.length} publications`);
  console.log(`${LOG_PREFIX} Timestamp: ${new Date().toISOString()}`);
  
  const cache = {
    lastUpdated: new Date().toISOString(),
    citations: {},
    stats: {
      semanticScholar: { success: 0, failed: 0 },
      googleScholar: { success: 0, failed: 0 },
      total: 0
    }
  };
  
  // Collect unique DOIs
  const dois = [...new Set(allPublications
    .map(pub => pub.dimensionsDoi || pub.doi)
    .filter(Boolean))];
  
  console.log(`${LOG_PREFIX} Fetching citations for ${dois.length} unique DOIs from Semantic Scholar...`);
  
  // Fetch from Semantic Scholar with concurrency control
  const batchSize = 5;
  for (let i = 0; i < dois.length; i += batchSize) {
    const batch = dois.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(doi => fetchFromSemanticScholar(doi)));
    
    results.forEach((result, idx) => {
      const doi = batch[idx];
      if (result.success && result.citations !== null) {
        cache.citations[doi] = result.citations;
        cache.stats.semanticScholar.success += 1;
        console.log(`${LOG_PREFIX} ${doi}: ${result.citations} citations (Semantic Scholar)`);
      } else {
        cache.stats.semanticScholar.failed += 1;
        console.log(`${LOG_PREFIX} ${doi}: Semantic Scholar fetch failed`);
      }
    });
  }
  
  // Try Google Scholar fallback for failed DOIs
  const failedDois = dois.filter(doi => !(doi in cache.citations));
  if (failedDois.length > 0) {
    console.log(`${LOG_PREFIX} Attempting Google Scholar fallback for ${failedDois.length} publications...`);
    const scholarResult = await fetchFromGoogleScholar();
    
    if (scholarResult.success && scholarResult.citations) {
      const matchedCitations = matchGoogleScholarCitations(
        allPublications.filter(pub => failedDois.includes(pub.dimensionsDoi || pub.doi)),
        scholarResult.citations
      );
      
      Object.entries(matchedCitations).forEach(([doi, count]) => {
        if (count !== null) {
          cache.citations[doi] = count;
          cache.stats.googleScholar.success += 1;
          console.log(`${LOG_PREFIX} ${doi}: ${count} citations (Google Scholar)`);
        } else {
          cache.stats.googleScholar.failed += 1;
        }
      });
    } else {
      console.log(`${LOG_PREFIX} Google Scholar fallback failed`);
      failedDois.forEach(doi => {
        cache.stats.googleScholar.failed += 1;
      });
    }
  }
  
  cache.stats.total = cache.stats.semanticScholar.success + cache.stats.googleScholar.success;
  
  // Write cache file
  const cacheFilePath = path.join(__dirname, 'js', 'citations-cache.json');
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
  
  console.log(`${LOG_PREFIX} Cache updated: ${cacheFilePath}`);
  console.log(`${LOG_PREFIX} Summary:
  - Semantic Scholar: ${cache.stats.semanticScholar.success} success, ${cache.stats.semanticScholar.failed} failed
  - Google Scholar: ${cache.stats.googleScholar.success} success, ${cache.stats.googleScholar.failed} failed
  - Total citations: ${cache.stats.total} publications with citation data`);
}

main().catch(error => {
  console.error(`${LOG_PREFIX} Error:`, error);
  process.exit(1);
});
