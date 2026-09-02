const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replacements
    content = content.replace(/Awais Mehboob/g, 'Sardar Awais');
    content = content.replace(/50\+ projects/gi, '500+ projects');
    content = content.replace(/50\+ Projects/g, '500+ Projects');
    content = content.replace(/50\+ AI agents/g, '500+ AI agents');
    content = content.replace(/50\+/g, '500+'); // General 50+ replacement
    content = content.replace(/500\+ X accounts/g, '50+ X accounts'); // Fix the specific X accounts case
    content = content.replace(/khanowais8888@gmail\.com/g, 'info@sardarawais.com');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
