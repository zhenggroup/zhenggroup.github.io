const fs = require('fs/promises');
const path = require('path');

const PUBLICATIONS_FILE = path.join(__dirname, 'publication', 'publications.md');
const CACHE_FILE = path.join(__dirname, 'js', 'citations-cache.json');
const DIMENSIONS_API_BASE = 'https://metrics-api.dimensions.ai/doi/';

function parsePublicationDois(markdown) {
    const dois = new Set();
    const sections = markdown.split(/\n(?=## )/).filter(section => section.trim().startsWith('## '));

    sections.forEach(section => {
        const fields = {};

        section.split(/\r?\n/).forEach(line => {
            const separatorIndex = line.indexOf(':');
            if (separatorIndex === -1) {
                return;
            }

            const key = line.slice(0, separatorIndex).trim().toLowerCase();
            const value = line.slice(separatorIndex + 1).trim();
            if (/^[a-z ]+$/.test(key)) {
                fields[key] = value;
            }
        });

        const doi = fields['dimensions doi'] || fields.doi;
        if (doi) {
            dois.add(doi);
        }
    });

    return Array.from(dois);
}

function extractCitationCount(payload) {
    if (!payload) {
        return null;
    }

    if (Array.isArray(payload)) {
        return extractCitationCount(payload[0]);
    }

    const candidates = [
        payload.times_cited,
        payload.timesCited,
        payload.citations,
        payload.citation_count,
        payload.metrics && payload.metrics.times_cited
    ];

    const value = candidates.find(item => typeof item === 'number' && Number.isFinite(item));
    return typeof value === 'number' ? value : null;
}

async function mapWithConcurrency(items, limit, iterator) {
    const results = new Array(items.length);
    let nextIndex = 0;

    async function worker() {
        while (nextIndex < items.length) {
            const index = nextIndex++;
            try {
                results[index] = await iterator(items[index], index);
            } catch (error) {
                console.warn(error.message);
                results[index] = null;
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return results;
}

async function fetchCitationRecord(doi) {
    const response = await fetch(`${DIMENSIONS_API_BASE}${encodeURIComponent(doi)}`);
    if (!response.ok) {
        throw new Error(`Dimensions request failed for ${doi}: ${response.status}`);
    }

    const payload = await response.json();
    const timesCited = extractCitationCount(payload);
    if (typeof timesCited !== 'number') {
        throw new Error(`Dimensions response did not include times_cited for ${doi}`);
    }

    return {
        doi,
        timesCited,
        recentCitations: typeof payload.recent_citations === 'number' ? payload.recent_citations : null,
        relativeCitationRatio: typeof payload.relative_citation_ratio === 'number' ? payload.relative_citation_ratio : null,
        fieldCitationRatio: typeof payload.field_citation_ratio === 'number' ? payload.field_citation_ratio : null
    };
}

async function main() {
    const markdown = await fs.readFile(PUBLICATIONS_FILE, 'utf8');
    const dois = parsePublicationDois(markdown);
    const records = await mapWithConcurrency(dois, 4, fetchCitationRecord);
    const citations = {};
    const details = {};
    const missing = [];

    records.forEach((record, index) => {
        const doi = dois[index];
        if (!record) {
            missing.push(doi);
            return;
        }

        citations[record.doi] = record.timesCited;
        details[record.doi] = {
            times_cited: record.timesCited,
            recent_citations: record.recentCitations,
            relative_citation_ratio: record.relativeCitationRatio,
            field_citation_ratio: record.fieldCitationRatio
        };
    });

    if (Object.keys(citations).length === 0) {
        throw new Error('No citation records were loaded; keeping the existing cache file unchanged.');
    }

    const cache = {
        lastUpdated: new Date().toISOString(),
        source: 'Dimensions Metrics API',
        doiCount: dois.length,
        loadedCount: Object.keys(citations).length,
        citations,
        details,
        missing
    };

    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);

    console.log(`Updated ${CACHE_FILE}: ${cache.loadedCount}/${cache.doiCount} DOI records loaded.`);
    if (missing.length > 0) {
        console.warn(`Missing citation records: ${missing.join(', ')}`);
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
