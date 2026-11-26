import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogs';
import BlogGeneratorButton from '@/components/blog/BlogGeneratorButton';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog & AI Insights | Sardar Awais',
  description: 'Deep dives into AI, web development, DevOps, cybersecurity, and emerging tech trends by Sardar Awais.',
  alternates: {
    canonical: 'https://sardarawais.com/blog',
  },
  openGraph: {
    title: 'Blog & AI Insights | Sardar Awais',
    description: 'Deep dives into AI, web development, DevOps, cybersecurity, and emerging tech trends by Sardar Awais.',
    url: 'https://sardarawais.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const blogs = getAllBlogs();

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

          <BlogGeneratorButton />

          {blogs.length === 0 ? (
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
                    <span className={styles.blogReadTime}>{blog.readTime || '5 min read'}</span>
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
