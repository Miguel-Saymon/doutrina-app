import { useEffect } from 'react';

import { usePostsContext } from '../contexts/PostsContext';

export function usePosts() {
  const {
    posts,
    loading,
    refreshing,
    error,
    loadPosts,
    refreshPosts,
    retry,
    getPostById,
  } = usePostsContext();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    refreshing,
    error,

    refresh: refreshPosts,
    retry,

    getPostById,
  };
}