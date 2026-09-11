import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Tech Stack',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
