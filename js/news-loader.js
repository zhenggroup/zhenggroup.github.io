// js/news-loader.js
// Loads news from news/news.md first. Markdown post manifests and legacy newsData are fallback paths.

function slugifyNewsId(value) {
    return String(value || 'news-item')
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/&[a-z0-9#]+;/gi, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function parseFrontMatter(markdown, fallbackId) {
    const result = { body: markdown.trim(), data: {} };
    const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

    if (!match) {
        result.data.id = fallbackId;
        result.data.title = fallbackId.replace(/-/g, ' ');
        return result;
    }

    match[1].split(/\r?\n/).forEach(line => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) return;

        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();
        value = value.replace(/^['"]|['"]$/g, '');
        result.data[key] = value;
    });

    result.body = match[2].trim();
    return result;
}

function inferNewsIndexPath(basePath) {
    if (basePath.includes('news/posts')) {
        return './news/news.md';
    }

    return './news.md';
}

function inferNewsManifestPath(basePath) {
    return `${basePath.replace(/\/?$/, '/') }manifest.js`;
}

function inferLegacyNewsDataPath(basePath) {
    if (basePath.includes('news/posts')) {
        return './js/news-data.js';
    }

    return '../js/news-data.js';
}

function splitNewsMarkdownSections(markdown) {
    return markdown
        .split(/\n(?=## )/)
        .filter(section => section.trim().startsWith('## '));
}

function normalizeNewsFieldKey(key) {
    return String(key || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function parseNewsIndexMarkdown(markdown) {
    return splitNewsMarkdownSections(markdown).map(section => {
        const lines = section.trim().split(/\r?\n/);
        const title = lines.shift().replace(/^##\s+/, '').trim();
        const fields = {};
        const bodyLines = [];
        let inBody = false;

        lines.forEach(line => {
            const separatorIndex = line.indexOf(':');
            const isField = !inBody && separatorIndex > -1 && /^[A-Za-z ]+$/.test(line.slice(0, separatorIndex));

            if (isField) {
                const key = normalizeNewsFieldKey(line.slice(0, separatorIndex));
                fields[key] = line.slice(separatorIndex + 1).trim();
                return;
            }

            if (line.trim()) {
                inBody = true;
            }
            bodyLines.push(line);
        });

        const id = fields.id || slugifyNewsId(title);

        return {
            id: slugifyNewsId(id),
            date: fields.date || '',
            title,
            content: bodyLines.join('\n').trim(),
            imageSrc: fields.image || fields['image src'] || null,
            imageAlt: fields['image alt'] || null,
            imageFloat: fields['image float'] || null,
            imageWidth: fields['image width'] || null,
            imageCaption: fields['image caption'] || null,
            source: 'news-index'
        };
    }).filter(item => item.title && item.date);
}

async function loadNewsIndex(indexPath) {
    const response = await fetch(indexPath, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`News index not found: ${indexPath}`);
    }

    const markdown = await response.text();
    return parseNewsIndexMarkdown(markdown);
}

function loadNewsScriptOnce(src, readyCheck) {
    return new Promise((resolve, reject) => {
        if (readyCheck()) {
            resolve();
            return;
        }

        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true });
            existingScript.addEventListener('error', reject, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadMarkdownNewsPosts(basePath) {
    if (!Array.isArray(window.newsMarkdownFiles)) {
        try {
            await loadNewsScriptOnce(
                inferNewsManifestPath(basePath),
                () => Array.isArray(window.newsMarkdownFiles)
            );
        } catch (error) {
            return [];
        }
    }

    const files = Array.isArray(window.newsMarkdownFiles) ? window.newsMarkdownFiles : [];

    const posts = await Promise.all(files.map(async fileName => {
        const response = await fetch(`${basePath}${fileName}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to load news post: ${fileName}`);
        }

        const rawMarkdown = await response.text();
        const fallbackId = slugifyNewsId(fileName.replace(/\.md$/i, ''));
        const parsed = parseFrontMatter(rawMarkdown, fallbackId);
        const id = parsed.data.id || fallbackId;

        return {
            id: slugifyNewsId(id),
            date: parsed.data.date || '',
            title: parsed.data.title || fallbackId.replace(/-/g, ' '),
            content: parsed.body,
            imageSrc: parsed.data.imageSrc || null,
            imageAlt: parsed.data.imageAlt || null,
            imageFloat: parsed.data.imageFloat || null,
            imageWidth: parsed.data.imageWidth || null,
            imageCaption: parsed.data.imageCaption || null,
            source: 'markdown'
        };
    }));

    return posts;
}

async function getAllNewsItems(options = {}) {
    const basePath = options.basePath || 'news/posts/';
    const indexPath = options.indexPath || inferNewsIndexPath(basePath);
    let markdownPosts = [];

    try {
        const indexedPosts = await loadNewsIndex(indexPath);
        if (indexedPosts.length > 0) {
            return indexedPosts.sort((a, b) => {
                return String(b.date || '').localeCompare(String(a.date || ''));
            });
        }
    } catch (error) {
        console.warn(error);
    }

    try {
        markdownPosts = await loadMarkdownNewsPosts(basePath);
    } catch (error) {
        console.warn(error);
    }

    try {
        await loadNewsScriptOnce(
            options.legacyDataPath || inferLegacyNewsDataPath(basePath),
            () => typeof newsData !== 'undefined' && Array.isArray(newsData)
        );
    } catch (error) {
        console.warn('Legacy news data could not be loaded:', error);
    }

    const legacyPosts = typeof newsData !== 'undefined' && Array.isArray(newsData) ? newsData : [];
    return [...markdownPosts, ...legacyPosts].sort((a, b) => {
        return String(b.date || '').localeCompare(String(a.date || ''));
    });
}
