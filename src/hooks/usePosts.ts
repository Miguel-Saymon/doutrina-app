import { useCallback, useEffect, useState } from 'react';

import { getPosts } from '../api/blogger/bloggerClient';
import { Post } from '../types/post';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getPosts();

      setPosts(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar as publicações.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const result = await getPosts();

      setPosts(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível atualizar as publicações.',
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  const retry = useCallback(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    refreshing,
    error,
    refresh,
    retry,
  };
}