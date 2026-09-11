import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore real-world case studies of AI integrations and scalable web applications built by Sardar Awais.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
