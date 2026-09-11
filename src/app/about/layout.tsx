import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
