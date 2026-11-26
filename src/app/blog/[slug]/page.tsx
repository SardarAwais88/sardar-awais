import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import BlogMarkdown from '@/components/blog/BlogMarkdown';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | Sardar Awais',
    };
  }

  const title = `${blog.title} | Sardar Awais`;
  const description = blog.description || blog.excerpt || blog.title;
  const canonicalUrl = `https://sardarawais.com/blog/${slug}`;
  const ogImage = blog.image || 'https://sardarawais.com/og-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author || 'Sardar Awais'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    name: blog.title,
    description: blog.description || blog.excerpt || blog.title,
    image: blog.image || 'https://sardarawais.com/og-image.jpg',
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author || 'Sardar Awais',
      url: 'https://sardarawais.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Sardar Awais',
      url: 'https://sardarawais.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sardarawais.com/blog/${blog.slug}`,
    },
  };

  return (
    <div className="page-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={`section ${styles.blogPostSection}`}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/blog">← Back to Blog</Link>
          </div>

          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span className={styles.articleDate}>{blog.date}</span>
                <span className={styles.articleDot}>•</span>
                <span className={styles.articleReadTime}>{blog.readTime || '5 min read'}</span>
                <span className={styles.articleDot}>•</span>
                <span className={styles.articleAuthor}>By {blog.author || 'Sardar Awais'}</span>
              </div>
              <h1 className={styles.articleTitle}>{blog.title}</h1>
              {blog.description && <p className={styles.articleDesc}>{blog.description}</p>}
              {blog.tags && blog.tags.length > 0 && (
                <div className={styles.articleTags}>
                  {blog.tags.map((tag) => (
                    <span key={tag} className={styles.articleTag}>{tag}</span>
                  ))}
                </div>
              )}
            </header>

            <div className={styles.articleContent}>
              <BlogMarkdown content={blog.content} />
            </div>

            <footer className={styles.articleFooter}>
              <div className={styles.authorCard}>
                <span className={styles.authorAvatar}>⚡</span>
                <div>
                  <strong>Sardar Awais</strong>
                  <p>Cloud & AI Automation Engineer, AI Engineer & DevOps Expert</p>
                </div>
              </div>
              <div className={styles.articleActions}>
                <Link href="/contact" className="btn btn-primary">
                  Hire Me for Your Project 🚀
                </Link>
                <Link href="/blog" className="btn btn-outline">
                  More Articles
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </div>
  );
}
