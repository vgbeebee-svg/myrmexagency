const fs = require('node:fs');
const html = fs.readFileSync(require('node:path').join(__dirname, 'index.html'), 'utf8');
new Function(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw Error('Duplicate IDs');
if (/\$\s*\d|USD\s*\d|\d+\s*USD/.test(html)) throw Error('Public price found');
for (const file of ['privacy.html', 'terms.html', 'copyright.html']) {
  if (!html.includes('https://myrmexagency.com/' + file)) throw Error('Missing legal link');
}
console.log('PASS: JavaScript syntax, unique IDs, no public prices, retained legal links.');
