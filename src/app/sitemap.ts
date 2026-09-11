import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { servicePages } from '@/data/servicePages';
import { caseStudies } from '@/data/caseStudies';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sardarawais.com';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/resume`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Individual project pages (include all projects)
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Individual service landing pages (high-value SEO targets)
  const serviceDetailPages: MetadataRoute.Sitemap = servicePages.map((sp) => ({
    url: `${baseUrl}/services/${sp.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Individual case study pages (long-tail SEO targets)
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Blog Pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogsDir = path.join(process.cwd(), 'src', 'data', 'blogs');
    if (fs.existsSync(blogsDir)) {
      const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith('.json'));
      blogPages = files.map((file) => {
        const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.json$/, '');
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
    }
  } catch (e) {
    console.error('Error reading blogs for sitemap:', e);
  }

  return [...staticPages, ...projectPages, ...serviceDetailPages, ...caseStudyPages, ...blogPages];
}
