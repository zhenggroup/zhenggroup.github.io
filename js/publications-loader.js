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
                <p class="publication-authors">${pub.authors}</p>
                <span class="publication-title">${pub.title}</span>
                <p class="publication-journal">${pub.journal}</p>`;

    // Links (DOI, PDF)
    html += `<div class="publication-links">`;
    if (pub.doi) {
        html += ` <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i>${pub.doi}</a>`;
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

    // Dimensions Badge
    const badgeDoi = pub.dimensionsDoi || pub.doi;
    if (badgeDoi) {
        html += `<div class="dimensions-badge-container">
                    <span class="__dimensions_badge_embed__" data-doi="${badgeDoi}" data-style="small_rectangle"></span>
                 </div>`;
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