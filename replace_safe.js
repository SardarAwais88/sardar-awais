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
    let content = fs.readFileSync(filePath);
    let text = content.toString('utf8');
    
    if (text.includes('Awais Mehboob') || text.includes('50+ ') || text.includes('khanowais') || text.includes('@awaisaisolutions.com')) {
      let originalText = text;
      
      text = text.replace(/Awais Mehboob/g, 'Sardar Awais');
      text = text.replace(/50\+ projects/gi, '500+ projects');
      text = text.replace(/50\+ Projects/g, '500+ Projects');
      text = text.replace(/50\+ AI agents/gi, '500+ AI agents');
      text = text.replace(/khanowais8888@gmail\.com/g, 'info@sardarawais.com');
      text = text.replace(/[a-zA-Z0-9._%+-]+@awaisaisolutions\.com/g, 'info@sardarawais.com');
      
      if (text !== originalText) {
        fs.writeFileSync(filePath, Buffer.from(text, 'utf8'));
        console.log(`Updated ${filePath}`);
      }
    }
  }
});
