'use client';
import { useState, useEffect } from 'react';

export default function LazyMount({ children, delay = 3500 }: { children: React.ReactNode, delay?: number }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait until the browser is idle, or fallback to a timeout
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) return null;

  return <>{children}</>;
}
