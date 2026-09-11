const fs = require('fs');

const pages = ['about', 'blog', 'case-studies', 'contact', 'projects', 'resume', 'services', 'skills'];

pages.forEach(slug => {
  const path = `src/app/${slug}/layout.tsx`;
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('alternates:')) {
    content = content.replace(/};\s*export default/, `  alternates: {\n    canonical: 'https://sardarawais.com/${slug}',\n  },\n};\n\nexport default`);
    fs.writeFileSync(path, content);
  }
});

// Also fix the homepage
const rootLayoutPath = 'src/app/layout.tsx';
let rootContent = fs.readFileSync(rootLayoutPath, 'utf8');
if (!rootContent.includes('alternates:')) {
  rootContent = rootContent.replace(/metadataBase: new URL\('https:\/\/sardarawais\.com'\),/, `metadataBase: new URL('https://sardarawais.com'),\n  alternates: {\n    canonical: 'https://sardarawais.com/',\n  },`);
  fs.writeFileSync(rootLayoutPath, rootContent);
}

console.log('Canonical tags added!');
