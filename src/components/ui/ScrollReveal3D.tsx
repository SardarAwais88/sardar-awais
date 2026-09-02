'use client';
import { useEffect } from 'react';

/**
 * Injects an IntersectionObserver that adds the `visible` class
 * to any element with the `reveal-3d` class when it scrolls into view.
 * Also adds the class to all page sections automatically.
 */
export default function ScrollReveal3D() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.page-content > div, .page-content > section');
    targets.forEach((el) => el.classList.add('reveal-3d'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-3d').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
