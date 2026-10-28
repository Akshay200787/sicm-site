// Builds the self-hosted bundle from the artifact page.
// Usage: node build-site.js [SITE_URL]   e.g. node build-site.js https://sicm.in/
const fs = require('fs');
const path = require('path');

const SITE_URL = (process.argv[2] || 'https://akshay200787.github.io/sicm-site/').replace(/\/?$/, '/');
const src = fs.readFileSync(path.join(__dirname, 'sicm-site.html'), 'utf8');
const outDir = path.join(__dirname, 'site');
fs.mkdirSync(outDir, { recursive: true });

// The artifact file is written for a host that supplies the document skeleton; a real server needs the whole document.
let body = src
  .replace(/<meta name="claude:viewport-fit-sides"[^>]*>\s*/, '')
  .replace(/<title>[^<]*<\/title>\s*/, '')
  .replace('This page cannot send mail. Composing fills a message you copy and send from your own mailbox to',
           'Composing prepares a message you send from your own mailbox to');

const favicon = 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#FAFAF7"/><rect x="4" y="4" width="56" height="56" fill="none" stroke="#1B1F2A" stroke-width="2"/><text x="32" y="44" text-anchor="middle" font-family="Georgia,serif" font-size="36" font-weight="600" fill="#8E1B2A">S</text></svg>`);

const description = 'A citation standard built for Indian sources, so the author who did the work can be told from the one who did not. Free chapter, editions and institutional licences.';

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Standard Indian Citation Manual</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${SITE_URL}">
<link rel="icon" href="${favicon}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Standard Indian Citation Manual">
<meta property="og:title" content="Standard Indian Citation Manual">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE_URL}">
<meta property="og:image" content="${SITE_URL}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Standard Indian Citation Manual">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${SITE_URL}og.png">
<meta name="author" content="Akshay Sreevatsa">
<meta name="theme-color" content="#FAFAF7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#15181F" media="(prefers-color-scheme: dark)">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)} img{max-width:100%} [hidden]{display:none!important}</style>
`;

const html = head + body.replace(/^\s*<link rel="preconnect"/, '</head>\n<body>\n<link rel="preconnect"') + '\n</body>\n</html>\n';
if (!html.includes('</head>\n<body>')) throw new Error('head/body split failed');
fs.writeFileSync(path.join(outDir, 'index.html'), html);
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`);
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}</loc><lastmod>${new Date().toISOString().slice(0,10)}</lastmod></url></urlset>\n`);
console.log('built for', SITE_URL, '→', outDir, (html.length/1024).toFixed(1) + ' KB');
