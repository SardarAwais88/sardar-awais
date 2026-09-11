import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Portfolio',
  description: 'Browse the complete portfolio of 48+ web development, AI, e-commerce, and automation projects.',
  alternates: {
    canonical: 'https://sardarawais.com/projects',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
