import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Tech Stack',
  description: 'A comprehensive overview of the programming languages, frameworks, and tools I use.',
  alternates: {
    canonical: 'https://sardarawais.com/skills',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
