import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume & Experience',
  description: 'View the professional resume, experience, and technical background of Sardar Awais.',
  alternates: {
    canonical: 'https://sardarawais.com/resume',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
