'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogGeneratorButton.module.css';

export default function BlogGeneratorButton() {
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auto-trigger daily blog check in background
    fetch('/api/cron/daily-blog')
      .then((res) => res.json())
      .then((data) => {
        if (data.generated) {
          router.refresh();
        }
      })
      .catch(() => {});
  }, [router]);

  const generateBlog = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/blog', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      }
    } catch {
      console.error('Failed to generate blog');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={styles.blogActions}>
      <button
        onClick={generateBlog}
        disabled={generating}
        className={`btn btn-primary ${styles.genBtn}`}
      >
        {generating ? '⏳ Generating...' : '🤖 Generate New Blog Post'}
      </button>
    </div>
  );
}
