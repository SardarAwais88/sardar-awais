const fs = require('fs');
const file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// The spam projects are on lines that start with `  {"id":` and have `Developed`.
// Let's filter them out.
const lines = content.split('\n');
const goodLines = lines.filter(l => {
  const trimmed = l.trim();
  if (trimmed.startsWith('{"id":') && trimmed.includes('Developed')) {
    return false;
  }
  return true;
});

// Now, let's inject a boilerplate problem/solution/result for projects that don't have them.
// We can do this with a simple regex or string replacement.
let newContent = goodLines.join('\n');

const missingSectionsRegex = /description:\s*['"](.*?)['"],(\s*)category:\s*['"](.*?)['"],(\s*)tech:\s*\[(.*?)\]/g;

// Wait, the order in the file is: description, (maybe fullDescription), category, tech...
// Let's use a more robust way to parse the objects.
// Actually, since it's a TS file, we can't easily parse it with JSON.parse.
// Let's just do a simple replacement for now, or just leave the cleanup.

fs.writeFileSync(file, newContent);
console.log('Spam removed.');
