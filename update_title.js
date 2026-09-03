const fs = require('fs');
const path = require('path');

const directory = './src';
const searchRegex1 = /Full-Stack Developer & AI Engineer/gi;
const searchRegex2 = /Full-Stack Developer, AI Engineer & Automation Specialist/gi;
const searchRegex3 = /Full-Stack Developer/gi;
const replacement = 'Cloud & AI Automation Engineer';

const searchRegex4 = /Full-Stack/g;
// We'll leave the 'Full-Stack' category alone in projects.ts if we can, 
// but we want to change references in text to 'Cloud & AI Automation'.

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace specific long titles first
  content = content.replace(searchRegex1, replacement);
  content = content.replace(searchRegex2, replacement);
  
  // Replace standalone "Full-Stack Developer" except if it's part of something else (already handled above)
  content = content.replace(searchRegex3, replacement);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory(directory);
console.log('Done replacing titles.');
