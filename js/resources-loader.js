// js/resources-loader.js

function parseResourceMarkdown(markdown) {
    const sections = [];
    const parts = markdown.split(/\n(?=## )/).filter(part => part.trim().startsWith('## '));

    parts.forEach(part => {
        const lines = part.trim().split(/\r?\n/);
        const title = lines.shift().replace(/^##\s+/, '').trim();
        const items = [];
        let sectionBodyLines = [];
        let currentItem = null;

        lines.forEach(line => {
            if (line.startsWith('### ')) {
                if (currentItem) items.push(currentItem);
                currentItem = {
                    title: line.replace(/^###\s+/, '').trim(),
                    fields: {},
                    bodyLines: []
                };
                return;
            }

            if (currentItem) {
                const separatorIndex = line.indexOf(':');
                const isField = separatorIndex > -1 && /^[A-Za-z ]+$/.test(line.slice(0, separatorIndex));
                if (isField) {
                    currentItem.fields[line.slice(0, separatorIndex).trim().toLowerCase()] = line.slice(separatorIndex + 1).trim();
                } else {
                    currentItem.bodyLines.push(line);
                }
            } else {
                sectionBodyLines.push(line);
            }
        });

        if (currentItem) items.push(currentItem);
        sections.push({ title, body: sectionBodyLines.join('\n').trim(), items });
    });

    return sections;
}

function renderMarkdown(markdown) {
    if (typeof marked !== 'undefined' && marked.parse) {
        return marked.parse(markdown || '');
    }
    return markdown || '';
}

function renderResourceTitle(item) {
    const url = item.fields.url;
    const note = item.fields.note;
    const linkedTitle = url
        ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
        : item.title;
    return `${linkedTitle}${note ? `<span class="note">(${note})</span>` : ''}`;
}

function renderResourceCard(item, extraClass = '') {
    if (extraClass.includes('featured-resource')) {
        const body = item.bodyLines.join('\n').trim();
        const [summary, ...details] = body.split(/\n\s*\n/);

        return `
            <div class="resource-card software-list-item ${extraClass}">
                <div>
                    <h3>${renderResourceTitle(item)}</h3>
                    <div class="software-description">${renderMarkdown(summary || '')}</div>
                </div>
                <div class="software-description">${renderMarkdown(details.join('\n\n'))}</div>
            </div>
        `;
    }

    return `
        <div class="resource-card software-list-item ${extraClass}">
            <h3>${renderResourceTitle(item)}</h3>
            <div class="software-description">${renderMarkdown(item.bodyLines.join('\n'))}</div>
        </div>
    `;
}

function renderIntroSection(section) {
    const titleMatch = section.body.match(/^Title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Research Resources';
    const bodyWithoutTitle = section.body.replace(/^Title:\s*.+$/m, '').trim();
    const quoteMatch = bodyWithoutTitle.match(/>\s*\*\*(.+?)\*\*\s*\n>\s*(.+)/);
    const description = bodyWithoutTitle.replace(/>\s*\*\*.+?\*\*\s*\n>\s*.+/s, '').trim();

    return `
        <section class="resource-intro">
            <div>
                <h2>${title}</h2>
                ${renderMarkdown(description)}
            </div>
            ${quoteMatch ? `
                <div class="resource-note-panel">
                    <strong>${quoteMatch[1]}</strong>
                    <span>${quoteMatch[2]}</span>
                </div>
            ` : ''}
        </section>
    `;
}

function renderLabSystems(section) {
    const html = section.items.map(item => {
        const icon = item.fields.icon || 'link';
        const url = item.fields.url || '#';
        const style = item.fields.style === 'nas' ? 'btn-nas' : 'btn-booking';
        return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn ${style}">
                <i class="fas fa-${icon}"></i>
                <strong>${item.title}<span>${renderMarkdown(item.bodyLines.join('\n')).replace(/^<p>|<\/p>\n?$/g, '')}</span></strong>
            </a>
        `;
    }).join('');

    return `<div class="lab-system-buttons">${html}</div>`;
}

function renderSoftwareSection(section) {
    const cards = section.items.map(item => {
        const featured = String(item.fields.featured || '').toLowerCase() === 'true';
        return renderResourceCard(item, featured ? 'featured-resource' : '');
    }).join('');

    return `
        <h2 class="section-heading">${section.title}</h2>
        <div class="resource-grid">${cards}</div>
    `;
}

function renderCardSection(section) {
    const itemsHtml = section.items.map(item => `
        <div>
            <h3>${renderResourceTitle(item)}</h3>
            ${renderMarkdown(item.bodyLines.join('\n'))}
        </div>
    `).join('');

    return `
        <h2 class="section-heading">${section.title}</h2>
        <div class="resource-card">
            <div class="learning-resource-block">${itemsHtml}</div>
        </div>
    `;
}

function renderResourceSections(sections) {
    return sections.map(section => {
        if (section.title === 'Intro') return renderIntroSection(section);
        if (section.title === 'Lab Systems') return renderLabSystems(section);
        if (section.title === 'Software Recommendations') return renderSoftwareSection(section);
        return renderCardSection(section);
    }).join('');
}

document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('resource-content');
    if (!container) return;

    try {
        const response = await fetch('./resources.md?preview-resource-md-3');
        if (!response.ok) throw new Error('resources.md not found');
        const markdown = await response.text();
        container.innerHTML = renderResourceSections(parseResourceMarkdown(markdown));
    } catch (error) {
        console.error('Failed to load resources.md:', error);
    }
});
