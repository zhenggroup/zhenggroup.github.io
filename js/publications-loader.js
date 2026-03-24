// js/publications-loader.js

function createPublicationHTML(pub) {
    let html = `<div class="publication-entry">`;

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

    // Links (DOI, PDF, Dimensions badge)
    html += `<div class="publication-links">`;
    if (pub.doi) {
        html += ` <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i>${pub.doi}</a>`;
        const badgeDoi = pub.dimensionsDoi || pub.doi;
        if (badgeDoi) {
            // Keep badge inline with DOI link
            html += ` <span class="dimensions-badge-inline"><span class="__dimensions_badge_embed__" data-doi="${badgeDoi}" data-style="small_rectangle"></span></span>`;
        }
    }
    if (pub.pdfLink) {
        html += ` <a href="${pub.pdfLink}" target="_blank" rel="noopener noreferrer"><i class="far fa-file-pdf"></i>PDF</a>`;
    }
    html += `</div>`;

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

    html += `   </div> <!-- End publication-details -->
            </div> <!-- End publication-entry -->`;
    return html;
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof allPublications === 'undefined' || !Array.isArray(allPublications)) {
        console.error('Publication data (allPublications array) not found or is not an array.');
        return;
    }

    const publicationsByYear = {};

    allPublications.forEach(pub => {
        const yearGroup = pub.year >= 2020 ? pub.year.toString() : 'before2020';
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
        } else {
            console.warn(`Card body with ID ${cardBodyId} not found.`);
        }
    }

    // After populating, re-initialize Dimensions badges
    if (window.__dimensions_embed) {
        window.__dimensions_embed.addBadges();
    }
    
    // LazySizes should pick up new images automatically if it's already loaded and observing.
    // If you face issues, you might need to manually trigger an update for LazySizes,
    // but usually, it's not necessary.
});

// Citation Modal Functionality
function showCitationModal(pubNumber) {
    const pub = allPublications.find(p => p.number === pubNumber);
    if (!pub) return;

    // Create modal HTML
    const modalHtml = `
        <div id="citation-modal" data-pub-number="${pubNumber}" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Source Sans Pro', sans-serif;">
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
    const pub = allPublications.find(p => p.number === pubNumber);
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