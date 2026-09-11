const fs = require('fs');
const content = fs.readFileSync('src/data/projects.ts', 'utf8');

const regex = /title:\s*['"](.*?)['"]/g;
let match;
const titles = [];
while ((match = regex.exec(content)) !== null) {
  titles.push(match[1]);
}

console.log('Total titles:', titles.length);
const counts = {};
titles.forEach(t => counts[t] = (counts[t] || 0) + 1);
const duplicates = Object.keys(counts).filter(t => counts[t] > 1);
console.log('Duplicate titles:', duplicates);
