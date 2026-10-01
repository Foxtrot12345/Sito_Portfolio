import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve('docs');
const files = [];
const problems = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else files.push(path);
  }
}

function checkReference(source, reference) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(reference)) return;
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean) return;
  const target = resolve(dirname(source), decodeURIComponent(clean));
  if (!target.startsWith(root) || !existsSync(target)) problems.push(`Missing or escaping link: ${source} → ${reference}`);
  else if (statSync(target).isDirectory() && !existsSync(join(target, 'index.html'))) problems.push(`Directory without index.html: ${source} → ${reference}`);
}

walk(root);
for (const file of files) {
  if (!/\.(?:html|md|css)$/i.test(file) && !file.endsWith('llms.txt')) continue;
  const content = readFileSync(file, 'utf8');
  if (file.endsWith('.html')) {
    for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) checkReference(file, match[1]);
    if (!/<html\s+lang="(?:it|en)"/i.test(content)) problems.push(`Missing page language: ${file}`);
    if (!/<title>[^<]+<\/title>/i.test(content)) problems.push(`Missing page title: ${file}`);
    if (!/name="description"/i.test(content)) problems.push(`Missing description: ${file}`);
    if (/<a\b[^>]*target="_blank"(?:(?!<\/a>).)*?>(?:(?!<\/a>).)*?<\/a>/gis.test(content)) {
      for (const match of content.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
        if (!/rel="[^"]*noopener[^"]*"/i.test(match[0])) problems.push(`External new tab without noopener: ${file}`);
      }
    }
  }
  if (file.endsWith('.md') || file.endsWith('llms.txt')) for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) checkReference(file, match[1]);
  if (file.endsWith('.css')) for (const match of content.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) checkReference(file, match[1]);
}

for (const file of files.filter(path => path.endsWith('index.html') && !path.includes(`${join(root, 'en')}\\`))) {
  const relative = file.slice(root.length + 1);
  const english = join(root, 'en', relative);
  if (!existsSync(english)) problems.push(`English counterpart missing: ${relative}`);
}

if (problems.length) {
  for (const problem of problems) console.error(problem);
  process.exitCode = 1;
} else {
  console.log(`OK: ${files.filter(file => file.endsWith('.html')).length} HTML pages and local references checked.`);
}
