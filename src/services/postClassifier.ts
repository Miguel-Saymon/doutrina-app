import { LEGACY_AUTHORS } from '../constants/legacyAuthors';
import { Post } from '../types/post';

const AUTHOR_PREFIX = 'autor:';

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase('pt-BR');
}

export function getAuthorsFromPost(post: Post): string[] {
  const authors = new Set<string>();

  for (const rawLabel of post.labels) {
    const label = rawLabel.trim();

    if (!label) {
      continue;
    }

    // Formato novo/padronizado:
    // autor:Nome do Autor
    if (normalize(label).startsWith(AUTHOR_PREFIX)) {
      const author = label.slice(AUTHOR_PREFIX.length).trim();

      if (author) {
        authors.add(author);
      }

      continue;
    }

    // Formato legado.
    //
    // Também reconhece autores conhecidos dentro de labels compostas:
    //
    // Direito Privado; Autor A; Autor B
    const parts = label
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean);

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