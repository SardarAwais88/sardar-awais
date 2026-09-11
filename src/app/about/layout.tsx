import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Sardar Awais, a full-stack developer and AI automation expert.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
