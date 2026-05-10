// js/publications-loader.js

function getPublicationAnchor(pub) {
    const source = pub.anchor || pub.doi || pub.title || `publication-${pub.number}`;
    return `pub-${String(source)
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/&[a-z0-9#]+;/gi, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`;
}

function splitPublicationList(value) {
    return String(value || '')
        .split('||')
        .map(item => item.trim())
        .filter(Boolean);
}

function splitFeaturedLinks(value) {
    return splitPublicationList(value).map(item => {
        const [text, url] = item.split('|').map(part => part.trim());
        return { text, url };
    }).filter(item => item.text && item.url);
}

function parsePublicationsMarkdown(markdown) {
    const entries = markdown.split(/\n(?=## )/).filter(section => section.trim().startsWith('## '));

    return entries.map(section => {
        const lines = section.trim().split(/\r?\n/);
        const title = lines.shift().replace(/^##\s+/, '').trim();
        const fields = {};
        const descriptionLines = [];
        let inDescription = false;

        lines.forEach(line => {
            const separatorIndex = line.indexOf(':');
            const isField = !inDescription && separatorIndex > -1 && /^[A-Za-z ]+$/.test(line.slice(0, separatorIndex));

            if (isField) {
                const key = line.slice(0, separatorIndex).trim().toLowerCase();
                const value = line.slice(separatorIndex + 1).trim();
                fields[key] = value;
                return;
            }

            if (line.trim()) {
                inDescription = true;
            }
            descriptionLines.push(line);
        });

        return {
            year: Number(fields.year) || 0,
            type: fields.type || 'Article',
            authors: fields.authors || '',
            title,
            journal: fields.journal || '',
            doi: fields.doi || '',
            dimensionsDoi: fields['dimensions doi'] || fields.doi || '',
            pdfLink: fields.pdf || '',
            imageUrl: fields.image || '',
            imageAlt: fields['image alt'] || '',
            comments: splitPublicationList(fields.comments),
            featuredIn: splitFeaturedLinks(fields.featured),
            description: descriptionLines.join('\n').trim()
        };
    });
}

async function loadPublications() {
    try {
        const response = await fetch('../publication/publications.md?citation-total-1');
        if (!response.ok) {
            throw new Error('publications.md not found');
        }

        const markdown = await response.text();
        const parsed = parsePublicationsMarkdown(markdown);
        if (parsed.length > 0) {
            return parsed;
        }
    } catch (error) {
        console.warn('Using legacy publication data fallback:', error);
    }

    return typeof allPublications !== 'undefined' && Array.isArray(allPublications) ? allPublications : [];
}

function stripPublicationMarkup(value) {
    const html = String(value || '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/&nbsp;/gi, ' ');
    const container = document.createElement('div');
    container.innerHTML = html;
    return (container.textContent || container.innerText || '')
        .replace(/\*/g, '')
        .replace(/\^/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function parsePublicationAuthors(authors) {
    return stripPublicationMarkup(authors)
        .split(',')
        .map(author => author
            .replace(/\s+/g, ' ')
            .replace(/[.;]+$/g, '')
            .trim())
        .filter(Boolean);
}

function isWeiranZhengAuthor(author) {
    return /\bw\.?\s*zheng\b/i.test(author) || /\bweiran\s+zheng\b/i.test(author);
}

function isWeiranZhengFirstOrLastAuthor(pub) {
    const authors = parsePublicationAuthors(pub.authors);
    if (authors.length === 0) {
        return false;
    }

    return isWeiranZhengAuthor(authors[0]) || isWeiranZhengAuthor(authors[authors.length - 1]);
}

function getPublicationDoi(pub) {
    return (pub.dimensionsDoi || pub.doi || '').trim();
}

function getCachedCitationCount(cache, doi) {
    if (!cache || !doi) {
        return null;
    }

    const citations = cache.citations || cache;
    const normalizedDoi = doi.toLowerCase();
    const directValue = Object.prototype.hasOwnProperty.call(citations, doi)
        ? citations[doi]
        : citations[normalizedDoi];
    return typeof directValue === 'number' ? directValue : null;
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

async function loadCitationCache() {
    try {
        const dailyCacheKey = new Date().toISOString().slice(0, 10);
        const response = await fetch(`../js/citations-cache.json?daily=${dailyCacheKey}`);
        if (!response.ok) {
            throw new Error('Citation cache not found');
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

async function fetchDimensionsCitationCount(doi) {
    const response = await fetch(`https://metrics-api.dimensions.ai/doi/${encodeURIComponent(doi)}`);
    if (!response.ok) {
        throw new Error(`Dimensions citation request failed for ${doi}`);
    }

    return extractCitationCount(await response.json());
}

let dimensionsCitationCountsPromise = null;

async function getDimensionsCitationCounts(publications = window.allPublications || []) {
    if (dimensionsCitationCountsPromise) {
        return dimensionsCitationCountsPromise;
    }

    dimensionsCitationCountsPromise = (async () => {
        const cache = await loadCitationCache();
        const uniqueDois = Array.from(new Set(publications.map(getPublicationDoi).filter(Boolean)));
        const pairs = await mapWithConcurrency(uniqueDois, 4, async doi => {
            const cachedCount = getCachedCitationCount(cache, doi);
            const citations = cachedCount ?? await fetchDimensionsCitationCount(doi);

            return typeof citations === 'number' ? [doi, citations] : null;
        });
        const counts = {};

        pairs.filter(Boolean).forEach(([doi, citations]) => {
            counts[doi] = citations;
        });

        return {
            counts,
            doiCount: uniqueDois.length,
            loadedCount: Object.keys(counts).length,
            lastUpdated: cache && cache.lastUpdated ? cache.lastUpdated : null,
            source: cache ? 'Dimensions daily cache' : 'Dimensions API'
        };
    })();

    return dimensionsCitationCountsPromise;
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
                console.warn(error);
                results[index] = null;
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return results;
}

function createHighlyCitedCard(item, index) {
    const pub = item.publication;
    const anchorId = getPublicationAnchor(pub);
    const citations = item.citations.toLocaleString();

    return `<article class="highly-cited-card">
        <div class="highly-cited-card-header">
            <span class="highly-cited-rank">#${index + 1}</span>
            <div class="highly-cited-count">
                <strong>${citations}</strong>
                <span>citations</span>
            </div>
        </div>
        <h3>${pub.title}</h3>
        <p class="publication-authors">${pub.authors}</p>
        <p class="publication-journal">${pub.journal}</p>
        <a class="highly-cited-card-link" href="#${anchorId}">View publication ${pub.number}.</a>
    </article>`;
}

async function renderHighlyCitedPapers() {
    const section = document.getElementById('highly-cited-section');
    const grid = document.getElementById('highly-cited-grid');
    const status = document.getElementById('highly-cited-status');
    const publications = window.allPublications || [];

    if (!section || !grid || !status) {
        return;
    }

    const eligiblePublications = publications
        .filter(isWeiranZhengFirstOrLastAuthor)
        .filter(pub => getPublicationDoi(pub));

    if (eligiblePublications.length === 0) {
        status.textContent = 'No eligible DOI records';
        return;
    }

    const citationData = await getDimensionsCitationCounts(publications);
    const ranked = eligiblePublications.map(pub => {
        const doi = getPublicationDoi(pub);
        const citations = citationData.counts[doi];

        return typeof citations === 'number' ? { publication: pub, citations } : null;
    });

    const topPapers = ranked
        .filter(Boolean)
        .sort((a, b) => b.citations - a.citations)
        .slice(0, 4);

    if (topPapers.length === 0) {
        status.textContent = 'Citation data unavailable';
        grid.innerHTML = '<p class="publication-intro-text">Dimensions citation data could not be loaded in this preview.</p>';
        return;
    }

    grid.innerHTML = topPapers.map(createHighlyCitedCard).join('');
    status.textContent = `Ranked by ${citationData.source}`;
}

function createPublicationHTML(pub) {
    const anchorId = getPublicationAnchor(pub);
    let html = `<div class="publication-entry" id="${anchorId}">`;

    // TOC Image
    html += `<div class="publication-toc">`;
    if (pub.imageUrl && pub.imageUrl !== "../img/placeholder-image.png" && pub.imageUrl !== "https://via.placeholder.com/180x120.png?text=Loading...") {
        const isWebp = pub.imageUrl.endsWith('.webp');
        // Basic assumption: if webp, a png might exist with same name. If not webp, use as is.
        const fallbackImageUrl = isWebp ? pub.imageUrl.replace(/\.webp$/i, '.png') : pub.imageUrl;
        const webpImageUrl = isWebp ? pub.imageUrl : (pub.imageUrl.endsWith('.png') ? pub.imageUrl.replace(/\.png$/i, '.webp') : '');


        if (webpImageUrl && fallbackImageUrl !== webpImageUrl) { // If we have distinct webp and fallback
             html += `<picture>
                        <source type="image/webp" srcset="../img/lazyload-ph.png" data-srcset="${webpImageUrl}">
                        <img src="../img/lazyload-ph.png" data-src="${fallbackImageUrl}" class="lazyload" alt="${pub.imageAlt || 'Publication TOC'}">
                     </picture>`;
        } else { // Only one image format provided or it's not webp initially
            html += `<img src="../img/lazyload-ph.png" data-src="${pub.imageUrl}" class="lazyload" alt="${pub.imageAlt || 'Publication TOC'}">`;
        }
    } else {
        // Keep the div for layout consistency even if no image
        // You could put a placeholder text or style it differently if desired
    }
    html += `</div>`;

    html += `<div class="publication-details">
                <div class="publication-header">
                    <span class="publication-number">${pub.number}.</span>
                    <span class="publication-type-tag">${pub.type}</span>
                </div>
                <span class="publication-title">${pub.title}</span>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-journal">${pub.journal}</p>`;

    // Links (DOI, PDF, Dimensions badge, Altmetric badge)
    html += `<div class="publication-links">`;
    if (pub.doi) {
        html += ` <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i>${pub.doi}</a>`;
    }
    if (pub.pdfLink) {
        html += ` <a href="${pub.pdfLink}" target="_blank" rel="noopener noreferrer"><i class="far fa-file-pdf"></i>PDF</a>`;
    }
    html += `</div>`;

    // Badges (Dimensions and Altmetric) - aligned below DOI
    const badgeDoi = pub.dimensionsDoi || pub.doi;
    if (badgeDoi) {
        html += `<div class="publication-badges">`;
        html += ` <span class="dimensions-badge-inline"><span class="__dimensions_badge_embed__" data-doi="${badgeDoi}" data-style="small_rectangle"></span></span>`;
        html += ` <span class="altmetric-badge-inline"><div class="altmetric-embed" data-badge-popover="bottom" data-badge-type="small_rectangle" data-doi="${badgeDoi}"></div></span>`;
        html += `</div>`;
    }

    // Comments
    if (pub.comments && pub.comments.length > 0) {
        pub.comments.forEach(comment => {
            html += `<p class="publication-comment">${comment}</p>`;
        });
    }

	// Featured In
    if (pub.featuredIn && pub.featuredIn.length > 0) {
        // The <i> and </i> tags have been removed from the lines below
        html += `<div class="publication-featured-links">Featured in: `;
        pub.featuredIn.forEach((link, index) => {
            html += `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a>`;
            if (index < pub.featuredIn.length - 1) {
                html += `, `;
            }
        });
        html += `</div>`;
    }

    // Markdown Description
    if (pub.description) {
        html += `<div class="publication-description">`;
        if (typeof marked !== 'undefined' && marked.parse) {
            html += marked.parse(pub.description);
        } else {
            html += pub.description;
        }
        html += `</div>`;
    }

    html += `   </div> <!-- End publication-details -->
            </div> <!-- End publication-entry -->`;
    return html;
}

document.addEventListener('DOMContentLoaded', async function() {
    const publications = await loadPublications();
    window.allPublications = publications;

    if (!Array.isArray(publications) || publications.length === 0) {
        console.error('Publication data not found.');
        return;
    }

    // Enable automatic numbering based on array order (newest first)
    let currentNumber = publications.length;
    publications.forEach(pub => {
        pub.number = currentNumber--;
    });

    const publicationsByYear = {};

    publications.forEach(pub => {
        const yearGroup = pub.year >= 2022 ? pub.year.toString() : 'before2022';
        if (!publicationsByYear[yearGroup]) {
            publicationsByYear[yearGroup] = [];
        }
        publicationsByYear[yearGroup].push(pub);
    });

    for (const yearGroup in publicationsByYear) {
        const cardBodyId = `card-body-${yearGroup}`;
        const cardBody = document.getElementById(cardBodyId);
        if (cardBody) {
            // Sort publications within this year group by number (descending)
            publicationsByYear[yearGroup].sort((a, b) => b.number - a.number);

            let yearHtml = '';
            publicationsByYear[yearGroup].forEach(pub => {
                yearHtml += createPublicationHTML(pub);
            });
            cardBody.innerHTML = yearHtml;
            const cardHeader = cardBody.closest('.card')?.querySelector('.card-header');
            const yearToggle = cardHeader?.querySelector('.year-toggle');
            if (yearToggle) {
                yearToggle.dataset.count = publicationsByYear[yearGroup].length;
            }
        } else {
            console.warn(`Card body with ID ${cardBodyId} not found.`);
        }
    }

    updatePublicationStats();
    renderHighlyCitedPapers();

    // After populating, re-initialize Dimensions badges
    if (window.__dimensions_embed) {
        window.__dimensions_embed.addBadges();
    }

    openPublicationFromHash();
    
    // LazySizes should pick up new images automatically if it's already loaded and observing.
    // If you face issues, you might need to manually trigger an update for LazySizes,
    // but usually, it's not necessary.
});

function openPublicationFromHash() {
    if (!window.location.hash || !window.location.hash.startsWith('#pub-')) {
        return;
    }

    const target = document.querySelector(window.location.hash);
    if (!target) {
        return;
    }

    const collapse = target.closest('.collapse');
    if (collapse && !collapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
        bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false }).show();
    }

    setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('publication-entry-highlight');
        setTimeout(() => target.classList.remove('publication-entry-highlight'), 2600);
    }, 250);
}

window.addEventListener('hashchange', openPublicationFromHash);

// Top publication stats (publication count + Dimensions citation aggregation)
async function updatePublicationStats() {
    const publications = window.allPublications || [];
    const publicationCountEl = document.getElementById('publication-count');
    const citationTotalCardEl = document.getElementById('citation-total-card');
    const citationTotalCountEl = document.getElementById('citation-total-count');
    const statusLabelEl = document.getElementById('citation-status-label');
    const statusValueEl = document.getElementById('citation-status-value');

    if (publicationCountEl) {
        publicationCountEl.textContent = publications.length.toString();
    }

    if (!statusLabelEl || !statusValueEl) {
        if (!citationTotalCardEl || !citationTotalCountEl) {
            return;
        }
    }

    if (!citationTotalCardEl && (!statusLabelEl || !statusValueEl)) {
        return;
    }

    try {
        if (citationTotalCardEl && citationTotalCountEl) {
            citationTotalCardEl.classList.remove('is-hidden');
            citationTotalCountEl.textContent = '...';
        }

        const citationData = await getDimensionsCitationCounts(publications);
        const totalCitations = Object.values(citationData.counts)
            .reduce((sum, citations) => sum + citations, 0);

        if (citationTotalCardEl && citationTotalCountEl) {
            citationTotalCountEl.textContent = totalCitations.toLocaleString();
            const updatedText = citationData.lastUpdated
                ? `; updated ${new Date(citationData.lastUpdated).toLocaleDateString()}`
                : '';
            citationTotalCardEl.title = `${citationData.source}: ${citationData.loadedCount}/${citationData.doiCount} DOI records loaded${updatedText}`;
        }

        if (statusLabelEl && statusValueEl) {
            statusLabelEl.textContent = `Total Citations: ${totalCitations.toLocaleString()}`;
            statusValueEl.textContent = `${citationData.source} (${citationData.loadedCount}/${citationData.doiCount})`;
        }
        
    } catch (error) {
        console.warn('Dimensions citation data not available:', error);
        if (citationTotalCardEl && citationTotalCountEl) {
            citationTotalCardEl.classList.add('is-hidden');
            citationTotalCountEl.textContent = '--';
        }
        if (statusLabelEl && statusValueEl) {
            statusLabelEl.textContent = 'Citation data not available';
            statusValueEl.textContent = 'Dimensions API could not be reached';
        }
    }
}

// Citation Modal Functionality
function showCitationModal(pubNumber) {
    const publications = window.allPublications || [];
    const pub = publications.find(p => p.number === pubNumber);
    if (!pub) return;

    // Create modal HTML
    const modalHtml = `
        <div id="citation-modal" data-pub-number="${pubNumber}" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: var(--font-family-sans-serif);">
            <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; color: var(--color-primary-blue); font-family: 'Libre Baskerville', serif;">Cite This Publication</h3>
                    <button onclick="closeCitationModal()" style="background: none; border: none; font-size: 1.5em; cursor: pointer; color: #666;">&times;</button>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: var(--color-dark-blue); font-family: 'Libre Baskerville', serif;">${pub.title}</strong><br>
                    <span style="color: var(--text-color-medium); font-style: italic;">${pub.authors}</span><br>
                    <span style="color: var(--text-color-subtle);">${pub.journal}</span>
                </div>

                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Citation Style:</label>
                    <select id="citation-style" style="padding: 0.5rem; border: 1px solid var(--border-color-medium); border-radius: 4px; width: 100%;">
                        <option value="apa">APA</option>
                        <option value="mla">MLA</option>
                        <option value="chicago">Chicago</option>
                        <option value="bibtex">BibTeX</option>
                    </select>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Citation:</label>
                    <textarea id="citation-text" readonly style="width: 100%; min-height: 120px; padding: 0.75rem; border: 1px solid var(--border-color-medium); border-radius: 4px; font-family: monospace; font-size: 0.9em; resize: vertical;"></textarea>
                </div>

                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button onclick="copyCitation()" style="padding: 0.5rem 1rem; background: var(--color-primary-blue); color: white; border: none; border-radius: 4px; cursor: pointer; transition: background 0.2s ease;">Copy Citation</button>
                    <button onclick="closeCitationModal()" style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background 0.2s ease;">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Generate initial citation
    updateCitation();

    // Add event listener for style changes
    document.getElementById('citation-style').addEventListener('change', updateCitation);
}

function closeCitationModal() {
    const modal = document.getElementById('citation-modal');
    if (modal) {
        modal.remove();
    }
}

function updateCitation() {
    const style = document.getElementById('citation-style').value;
    const modal = document.getElementById('citation-modal');
    const pubNumber = parseInt(modal.getAttribute('data-pub-number'));
    const publications = window.allPublications || [];
    const pub = publications.find(p => p.number === pubNumber);
    if (!pub) return;

    let citation = '';

    switch (style) {
        case 'apa':
            citation = generateAPACitation(pub);
            break;
        case 'mla':
            citation = generateMLACitation(pub);
            break;
        case 'chicago':
            citation = generateChicagoCitation(pub);
            break;
        case 'bibtex':
            citation = generateBibTeXCitation(pub);
            break;
    }

    document.getElementById('citation-text').value = citation;
}

function generateAPACitation(pub) {
    // Parse authors
    const authors = pub.authors.replace(/<[^>]*>/g, '').split(', ');
    let authorString = '';

    if (authors.length === 1) {
        authorString = authors[0];
    } else if (authors.length === 2) {
        authorString = `${authors[0]} & ${authors[1]}`;
    } else {
        authorString = `${authors[0]} et al.`;
    }

    // Parse journal info
    const journalMatch = pub.journal.match(/(.+?),\s*(\d+),\s*(.+)/);
    if (journalMatch) {
        const journal = journalMatch[1];
        const year = journalMatch[2];
        const pages = journalMatch[3];
        return `${authorString} (${year}). ${pub.title}. ${journal}, ${pages}. https://doi.org/${pub.doi}`;
    }

    return `${authorString} (${pub.year}). ${pub.title}. ${pub.journal}. https://doi.org/${pub.doi}`;
}

function generateMLACitation(pub) {
    const authors = pub.authors.replace(/<[^>]*>/g, '').split(', ');
    let authorString = authors.length > 1 ? `${authors[0]}, ${authors.slice(1).join(', ')}` : authors[0];

    return `${authorString}. "${pub.title}." ${pub.journal}, ${pub.year}.`;
}

function generateChicagoCitation(pub) {
    const authors = pub.authors.replace(/<[^>]*>/g, '').split(', ');
    let authorString = authors[0];

    return `${authorString}. "${pub.title}." ${pub.journal} ${pub.year}.`;
}

function generateBibTeXCitation(pub) {
    const authors = pub.authors.replace(/<[^>]*>/g, '').split(', ');
    const lastName = authors[0].split(' ').pop();
    const key = `${lastName}${pub.year}`;

    return `@article{${key},\n  title={${pub.title}},\n  author={${authors.join(' and ')}},\n  journal={${pub.journal}},\n  year={${pub.year}},\n  doi={${pub.doi}}\n}`;
}

function copyCitation() {
    const citationText = document.getElementById('citation-text');
    citationText.select();
    document.execCommand('copy');

    // Show feedback
    const copyBtn = document.querySelector('#citation-modal button[onclick="copyCitation()"]');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#28a745';

    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

// Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('publication-search');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const publicationEntries = document.querySelectorAll('.publication-entry');
            let visibleCount = 0;

            publicationEntries.forEach(entry => {
                const title = entry.querySelector('.publication-title')?.textContent.toLowerCase() || '';
                const authors = entry.querySelector('.publication-authors')?.textContent.toLowerCase() || '';
                const journal = entry.querySelector('.publication-journal')?.textContent.toLowerCase() || '';
                const type = entry.querySelector('.publication-type-tag')?.textContent.toLowerCase() || '';

                const matches = title.includes(query) ||
                               authors.includes(query) ||
                               journal.includes(query) ||
                               type.includes(query);

                if (matches || query === '') {
                    entry.style.display = '';
                    visibleCount++;
                } else {
                    entry.style.display = 'none';
                }
            });

            // Update search results count
            if (query === '') {
                searchResults.textContent = `Showing all ${publicationEntries.length} publications`;
            } else {
                searchResults.textContent = `Showing ${visibleCount} of ${publicationEntries.length} publications`;
            }
        });

        // Initial count
        const totalPublications = document.querySelectorAll('.publication-entry').length;
        searchResults.textContent = `Showing ${totalPublications} publications`;
    }
});
