import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getPosts } from '../api/blogger/bloggerClient';
import { Post } from '../types/post';

type PostsContextValue = {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;

  loadPosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  retry: () => Promise<void>;

  getPostById: (postId: string) => Post | undefined;
};

type Props = {
  children: ReactNode;
};

const CACHE_TTL_MS = 5 * 60 * 1000;

const PostsContext = createContext<PostsContextValue | undefined>(
  undefined,
);

export function PostsProvider({ children }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchedAtRef = useRef<number | null>(null);
  const requestInProgressRef = useRef<Promise<Post[]> | null>(null);

  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    if (requestInProgressRef.current) {
      return requestInProgressRef.current;
    }

    const request = getPosts();

    requestInProgressRef.current = request;

    try {
      return await request;
    } finally {
      requestInProgressRef.current = null;
    }
  }, []);

  const isCacheValid = useCallback(() => {
    if (posts.length === 0) {
      return false;
    }

    if (lastFetchedAtRef.current === null) {
      return false;
    }

    const cacheAge =
      Date.now() - lastFetchedAtRef.current;

    return cacheAge < CACHE_TTL_MS;
  }, [posts.length]);

  const loadPosts = useCallback(async () => {
    if (isCacheValid()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await fetchPosts();

      setPosts(result);
      lastFetchedAtRef.current = Date.now();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar as publicações.',
      );
    } finally {
      setLoading(false);
    }
  }, [fetchPosts, isCacheValid]);

  const refreshPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const result = await fetchPosts();

      setPosts(result);
      lastFetchedAtRef.current = Date.now();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível atualizar as publicações.',
      );
    } finally {
      setRefreshing(false);
    }
  }, [fetchPosts]);

  const retry = useCallback(async () => {
    lastFetchedAtRef.current = null;

    await loadPosts();
  }, [loadPosts]);

  const getPostById = useCallback(
    (postId: string) =>
      posts.find((post) => post.id === postId),
    [posts],
  );

  const value = useMemo<PostsContextValue>(
    () => ({
      posts,
      loading,
      refreshing,
      error,

      loadPosts,
      refreshPosts,
      retry,

      getPostById,
    }),
    [
      posts,
      loading,
      refreshing,
      error,
      loadPosts,
      refreshPosts,
      retry,
      getPostById,
    ],
  );

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      'usePostsContext deve ser usado dentro de PostsProvider.',
    );
  }

  return context;
}