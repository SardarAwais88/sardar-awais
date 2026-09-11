import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Solutions',
  description: 'Discover custom services including MCP server development, RAG chatbots, and VAPI voice agents.',
  alternates: {
    canonical: 'https://sardarawais.com/services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
