// js/news-loader.js
// Loads news from Markdown files listed in news/posts/manifest.js and merges them with legacy newsData.

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

async function loadMarkdownNewsPosts(basePath) {
    const files = Array.isArray(window.newsMarkdownFiles) ? window.newsMarkdownFiles : [];

    const posts = await Promise.all(files.map(async fileName => {
        const response = await fetch(`${basePath}${fileName}`);
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
    let markdownPosts = [];

    try {
        markdownPosts = await loadMarkdownNewsPosts(basePath);
    } catch (error) {
        console.error(error);
    }

    const legacyPosts = typeof newsData !== 'undefined' && Array.isArray(newsData) ? newsData : [];
    return [...markdownPosts, ...legacyPosts].sort((a, b) => {
        return String(b.date || '').localeCompare(String(a.date || ''));
    });
}
