import { LEGACY_AREAS } from '../constants/legacyAreas';
import { LEGACY_AUTHORS } from '../constants/legacyAuthors';
import { Post } from '../types/post';

const AUTHOR_PREFIX = 'autor:';
const AREA_PREFIX = 'area:';

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase('pt-BR');
}

function splitLabel(label: string): string[] {
  return label
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean);
}

export function getAuthorsFromPost(post: Post): string[] {
  const authors = new Set<string>();

  for (const rawLabel of post.labels) {
    const label = rawLabel.trim();

    if (!label) {
      continue;
    }

    if (normalize(label).startsWith(AUTHOR_PREFIX)) {
      const author = label.slice(AUTHOR_PREFIX.length).trim();

      if (author) {
        authors.add(author);
      }

      continue;
    }

    const parts = splitLabel(label);

    for (const part of parts) {
      const legacyAuthor = LEGACY_AUTHORS.find(
        (author) => normalize(author) === normalize(part),
      );

      if (legacyAuthor) {
        authors.add(legacyAuthor);
      }
    }
  }

  return [...authors];
}

export function getAuthorsFromPosts(posts: Post[]): string[] {
  const authors = new Set<string>();

  for (const post of posts) {
    for (const author of getAuthorsFromPost(post)) {
      authors.add(author);
    }
  }

  return [...authors].sort((a, b) =>
    a.localeCompare(b, 'pt-BR', {
      sensitivity: 'base',
    }),
  );
}

export function getPostsByAuthor(
  posts: Post[],
  author: string,
): Post[] {
  const normalizedAuthor = normalize(author);

  return posts.filter((post) =>
    getAuthorsFromPost(post).some(
      (postAuthor) =>
        normalize(postAuthor) === normalizedAuthor,
    ),
  );
}

export function getAreasFromPost(post: Post): string[] {
  const areas = new Set<string>();

  for (const rawLabel of post.labels) {
    const label = rawLabel.trim();

    if (!label) {
      continue;
    }

    if (normalize(label).startsWith(AREA_PREFIX)) {
      const area = label.slice(AREA_PREFIX.length).trim();

      if (area) {
        areas.add(area);
      }

      continue;
    }

    const parts = splitLabel(label);

    for (const part of parts) {
      const legacyArea = LEGACY_AREAS.find(
        (area) => normalize(area) === normalize(part),
      );

      if (legacyArea) {
        areas.add(legacyArea);
      }
    }
  }

  return [...areas];
}

export function getAreasFromPosts(posts: Post[]): string[] {
  const areas = new Set<string>();

  for (const post of posts) {
    for (const area of getAreasFromPost(post)) {
      areas.add(area);
    }
  }

  return [...areas].sort((a, b) =>
    a.localeCompare(b, 'pt-BR', {
      sensitivity: 'base',
    }),
  );
}

export function getPostsByArea(
  posts: Post[],
  area: string,
): Post[] {
  const normalizedArea = normalize(area);

  return posts.filter((post) =>
    getAreasFromPost(post).some(
      (postArea) =>
        normalize(postArea) === normalizedArea,
    ),
  );
}