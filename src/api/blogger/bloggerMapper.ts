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

function cleanHtml(html: string): string {
  return html
    // Remove blocos de CSS e scripts.
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')

    // Remove tags específicas geradas pelo Microsoft Office.
    .replace(/<\/?o:p[^>]*>/gi, '')
    .replace(/<\/?w:[^>]*>/gi, '')
    .replace(/<\/?v:[^>]*>/gi, '')

    // Remove comentários HTML, comuns em conteúdo vindo do Word.
    .replace(/<!--[\s\S]*?-->/g, '');
}

function stripHtml(html: string): string {
  const cleanedHtml = cleanHtml(html);

  return cleanedHtml
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

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  const preview =
    lastSpace > 0
      ? truncated.slice(0, lastSpace)
      : truncated;

  return `${preview.trim()}…`;
}

export function mapBloggerEntryToPost(
  entry: BloggerEntry,
): Post {
  const rawHtml = entry.content?.$t ?? '';
  const html = cleanHtml(rawHtml);

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

    authors: [],

    areas: [],

    isGraduation: false,
  };
}