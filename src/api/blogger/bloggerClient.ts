import { Post } from '../../types/post';
import { mapBloggerEntryToPost } from './bloggerMapper';
import { BloggerFeedResponse } from './bloggerTypes';

const BLOGGER_FEED_URL =
  'https://www.doutrina.net/feeds/posts/default?alt=json&max-results=10';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(BLOGGER_FEED_URL);

  if (!response.ok) {
    throw new Error(
      `Erro ao carregar o Blogger: ${response.status}`,
    );
  }

  const data: BloggerFeedResponse = await response.json();

  const entries = data.feed.entry ?? [];

  return entries.map(mapBloggerEntryToPost);
}