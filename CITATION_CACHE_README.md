# Citation Cache System

## Overview

This system automatically fetches and caches publication citation counts from two sources:

1. **Semantic Scholar API** (primary) - Free API that provides citation counts for DOI-based lookups
2. **Google Scholar Profile** (fallback) - Your Google Scholar profile data for publications not found via Semantic Scholar

Citations are updated automatically via **GitHub Actions** on a daily schedule and cached in a JSON file for fast client-side loading.

## How It Works

### Backend (Server-side)

**`citation-fetcher.js`**
- Node.js script that runs on GitHub Actions
- Loads all publications from `js/publications-data.js`
- Fetches citation counts from Semantic Scholar API
- Falls back to Google Scholar profile if needed
- Writes results to `js/citations-cache.json`
- Runs daily at 2 AM UTC (configurable in `.github/workflows/update-citations.yml`)

**`.github/workflows/update-citations.yml`**
- GitHub Actions workflow configuration
- Triggers the citation fetcher script on schedule
- Automatically commits updated cache to repository
- Can also be triggered manually from GitHub Actions UI

### Frontend (Client-side)

**`js/citations-cache.json`**
- Pre-computed citation data
- Contains total citation counts per DOI
- Updated automatically by GitHub Actions
- No external API calls needed from browser

**`js/publications-loader.js`**
- Modified `updatePublicationStats()` function
- Loads citation cache from JSON file
- Calculates total citations immediately
- Shows last update date and number of publications with citation data
- No real-time API calls = fast loading

## Setup Instructions

### 1. Initial Setup (One-time)

Files are already in place:
- ✅ `citation-fetcher.js` - Created
- ✅ `.github/workflows/update-citations.yml` - Created
- ✅ `js/citations-cache.json` - Created (empty cache)
- ✅ Client code updated to use cache

### 2. GitHub Actions Configuration

The workflow is already set up in `.github/workflows/update-citations.yml`:

```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

To change update frequency:
- `0 2 * * *` = Daily
- `0 2 * * 0` = Weekly (Sunday)
- `0 2 */2 * *` = Every 2 days

### 3. First-Time Run

The first citation update will happen automatically at the next scheduled time, or you can manually trigger it:

1. Go to your GitHub repository
2. Click "Actions" tab
3. Click "Update Citations Cache" workflow
4. Click "Run workflow" button

### 4. Monitor Updates

Check the GitHub Actions page to see:
- When the script last ran
- Success/failure status
- Detailed logs of what was fetched

## Citation Sources

### Semantic Scholar API
- **URL**: `https://api.semanticscholar.org/graph/v1/paper/DOI:<doi>`
- **Benefits**: 
  - Free, no authentication required
  - Reliable, covers most scientific papers
  - Fast responses
- **Coverage**: Research papers from various fields

### Google Scholar Profile (Fallback)
- **Profile URL**: `https://scholar.google.com.hk/citations?user=hEpBUuYAAAAJ&hl=en`
- **Benefits**:
  - Your personal profile data
  - Accurate for papers you've published/claimed
- **Used when**: Semantic Scholar doesn't have citation data

## Cache File Structure

```json
{
  "lastUpdated": "2026-03-26T02:15:30.000Z",
  "citations": {
    "10.1021/acselectrochem.6c00058": 5,
    "10.1021/acsenergylett.3c00366": 42,
    ...
  },
  "stats": {
    "semanticScholar": {
      "success": 52,
      "failed": 3
    },
    "googleScholar": {
      "success": 2,
      "failed": 1
    },
    "total": 54
  }
}
```

## Troubleshooting

### Citations not updating?

1. Check GitHub Actions status:
   - Go to repository "Actions" tab
   - Click "Update Citations Cache" workflow
   - See if recent runs succeeded or failed

2. Check logs:
   - Click on the latest workflow run
   - View detailed logs of what happened

3. Common issues:
   - **Network timeout**: Semantic Scholar or Google Scholar API unreachable
   - **Rate limiting**: Too many requests to source (unlikely with daily updates)
   - **Google Scholar structure changed**: Fallback parsing may fail

### How to manually trigger?

In GitHub Actions:
1. Click "Update Citations Cache" workflow
2. Click "Run workflow" dropdown
3. Click "Run workflow" button
4. Wait ~1-2 minutes for completion

### Want to adjust update frequency?

Edit `.github/workflows/update-citations.yml`:
- Change the `cron` schedule line
- Commit and push to repository
- New schedule takes effect immediately

## Performance Benefits

- **Fast page loads**: Citations loaded from local JSON, not API
- **No external dependencies**: No real-time API calls in browser
- **Reliable**: Works even if external APIs are down
- **Automatic updates**: No manual intervention needed
- **Transparent**: Users see when data was last updated

## Example Output

When users visit the publications page:
- Publications count: `65` (instant)
- Total Citations: `1,247` (loaded from cache)
- Citation status: `Citations updated: 3/20/2026 (58/60 publications)`

## Future Enhancements

Consider adding:
- Citation trend tracking (history over time)
- Per-publication citation counts in publication list
- Different update frequencies for different sections
- Email notifications when significant citation changes occur
