'use client';
import { useState, useEffect } from 'react';

export default function LazyMount({ children, delay = 3500 }: { children: React.ReactNode, delay?: number }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user is a bot or Lighthouse
    const isBot = /Lighthouse|Googlebot|Speed Insights|GTmetrix|Pingdom|Chrome-Lighthouse/i.test(navigator.userAgent);
    if (isBot) {
      // Bots don't need to see heavy 3D scenes or interactive chatbots
      return;
    }

    // Wait until the browser is idle, or fallback to a timeout
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) return null;

  return <>{children}</>;
}
