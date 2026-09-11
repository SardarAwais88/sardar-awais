const fs = require('fs');
const pages = {
  'about': 'About Me',
  'blog': 'Blog & AI Insights',
  'case-studies': 'Case Studies',
  'contact': 'Contact',
  'projects': 'Projects Portfolio',
  'resume': 'Resume & Experience',
  'services': 'Services & Solutions',
  'skills': 'Skills & Tech Stack'
};

Object.entries(pages).forEach(([slug, title]) => {
  const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title}',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
  fs.writeFileSync(`src/app/${slug}/layout.tsx`, content);
});
console.log('Layouts created!');
