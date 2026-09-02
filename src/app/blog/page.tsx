'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  readTime: string;
  date: string;
  author: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchBlogs();
    // Auto-trigger daily blog generation in the background
    triggerDailyBlog();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const triggerDailyBlog = async () => {
    try {
      const res = await fetch('/api/cron/daily-blog');
      const data = await res.json();
      if (data.generated) {
        // New blog was generated, refresh the list
        await fetchBlogs();
      }
    } catch {
      // Silent fail — will retry next visit
    }
  };

  const generateBlog = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/blog', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await fetchBlogs();
      }
    } catch {
      console.error('Failed to generate blog');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.blogSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Tech Blog</span>
            <h1 className="section-title">
              Latest <span className="gradient-text">Insights</span>
            </h1>
            <p className="section-subtitle">
              Deep dives into AI, web development, DevOps, and emerging tech trends
            </p>
          </div>

          <div className={styles.blogActions}>
            <button
              onClick={generateBlog}
              disabled={generating}
              className={`btn btn-primary ${styles.genBtn}`}
            >
              {generating ? '⏳ Generating...' : '🤖 Generate New Blog Post'}
            </button>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingDots}>
                <span /><span /><span />
              </div>
              <p>Loading blog posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📝</span>
              <h3>No Blog Posts Yet</h3>
              <p>Click &quot;Generate New Blog Post&quot; to create your first AI-generated article</p>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className={styles.blogCard}
                >
                  <div className={styles.blogMeta}>
                    <span className={styles.blogDate}>{blog.date}</span>
                    <span className={styles.blogReadTime}>{blog.readTime}</span>
                  </div>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogDesc}>{blog.description}</p>
                  <div className={styles.blogTags}>
                    {blog.tags?.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.blogTag}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.readMore}>Read Article →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
