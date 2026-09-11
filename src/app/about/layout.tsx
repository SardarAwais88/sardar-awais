import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Sardar Awais, a full-stack developer and AI automation expert.',
  alternates: {
    canonical: 'https://sardarawais.com/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
