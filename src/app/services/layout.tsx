import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Solutions',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
