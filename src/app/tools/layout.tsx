import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tools & Generators',
  description: 'Free & Premium AI Tools by Sardar Awais',
  alternates: {
    canonical: 'https://sardarawais.com/tools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
