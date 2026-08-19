import { Post } from '../../types/post';
import { BloggerEntry } from './bloggerTypes';

function getPostUrl(entry: BloggerEntry): string {
  return (
    entry.link?.find((link) => link.rel === 'alternate')?.href ?? ''
  );
}

function getLabels(entry: BloggerEntry): string[] {
  return entry.category?.map((category) => category.term) ?? [];
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function createPreview(html: string, maxLength = 180): string {
  const text = stripHtml(html);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

export function mapBloggerEntryToPost(entry: BloggerEntry): Post {
  const html = entry.content?.$t ?? '';
  const labels = getLabels(entry);

  return {
    id: entry.id.$t,
    title: entry.title?.$t ?? 'Sem título',
    html,
    preview: createPreview(html),

    publishedAt: entry.published?.$t ?? '',
    updatedAt: entry.updated?.$t ?? '',

    url: getPostUrl(entry),

    labels,

    // Classificação será implementada depois.
    authors: [],
    areas: [],
    isGraduation: false,
  };
}