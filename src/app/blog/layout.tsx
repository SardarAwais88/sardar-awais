import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & AI Insights | Sardar Awais',
  description: 'Read the latest insights on AI agents, website development, cloud architecture, and business automation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
