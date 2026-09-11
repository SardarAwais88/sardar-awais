import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore real-world case studies of AI integrations and scalable web applications built by Sardar Awais.',
  alternates: {
    canonical: 'https://sardarawais.com/case-studies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
