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
    // Remove CSS e scripts incorporados.
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')

    // Remove comentários do Word e outros editores.
    .replace(/<!--[\s\S]*?-->/g, '')

    // Remove tags específicas do Microsoft Office.
    .replace(/<\/?o:p[^>]*>/gi, '')
    .replace(/<\/?w:[^>]*>/gi, '')
    .replace(/<\/?v:[^>]*>/gi, '')

    // Remove elementos sem utilidade no leitor mobile.
    .replace(/<\/?meta[^>]*>/gi, '')
    .replace(/<\/?link[^>]*>/gi, '')

    // Remove classes geradas pelo Word.
    .replace(/\sclass=(["'])Mso[^"']*\1/gi, '')

    // Remove atributos de largura fixa.
    .replace(/\swidth=(["'])?\d+(px)?\1?/gi, '')
    .replace(/\sheight=(["'])?\d+(px)?\1?/gi, '')

    // Remove propriedades CSS que normalmente quebram o layout mobile.
    .replace(
      /style=(["'])(.*?)\1/gi,
      (_, quote: string, styles: string) => {
        const safeStyles = styles
          .split(';')
          .map((style) => style.trim())
          .filter(Boolean)
          .filter((style) => {
            const normalized = style.toLowerCase();

            return !(
              normalized.startsWith('width:') ||
              normalized.startsWith('min-width:') ||
              normalized.startsWith('max-width:') ||
              normalized.startsWith('height:') ||
              normalized.startsWith('position:') ||
              normalized.startsWith('left:') ||
              normalized.startsWith('right:') ||
              normalized.startsWith('top:') ||
              normalized.startsWith('bottom:') ||
              normalized.startsWith('margin-left:') ||
              normalized.startsWith('margin-right:')
            );
          })
          .join('; ');

        return safeStyles
          ? `style=${quote}${safeStyles}${quote}`
          : '';
      },
    );
}

function stripHtml(html: string): string {
  const cleanedHtml = cleanHtml(html);

  return cleanedHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function createPreview(
  html: string,
  maxLength = 180,
): string {
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

  return {
    id: entry.id.$t,

    title: entry.title?.$t ?? 'Sem título',

    html,

    preview: createPreview(html),

    publishedAt: entry.published?.$t ?? '',

    updatedAt: entry.updated?.$t ?? '',

    url: getPostUrl(entry),

    labels: getLabels(entry),

    authors: [],

    areas: [],

    isGraduation: false,
  };
}