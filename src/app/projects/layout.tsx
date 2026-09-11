import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Portfolio',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
