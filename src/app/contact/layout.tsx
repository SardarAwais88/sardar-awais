import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sardar Awais for urgent website development and custom AI chatbot solutions.',
  alternates: {
    canonical: 'https://sardarawais.com/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
