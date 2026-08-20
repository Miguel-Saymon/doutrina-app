import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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

type PersistedPostsCache = {
  posts: Post[];
  fetchedAt: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000;

const POSTS_CACHE_KEY = '@doutrina/posts-cache';

const PostsContext = createContext<PostsContextValue | undefined>(
  undefined,
);

export function PostsProvider({ children }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [storageReady, setStorageReady] = useState(false);

  const lastFetchedAtRef = useRef<number | null>(null);
  const requestInProgressRef = useRef<Promise<Post[]> | null>(null);

  const persistCache = useCallback(
    async (
      postsToPersist: Post[],
      fetchedAt: number,
    ) => {
      const cache: PersistedPostsCache = {
        posts: postsToPersist,
        fetchedAt,
      };

      try {
        await AsyncStorage.setItem(
          POSTS_CACHE_KEY,
          JSON.stringify(cache),
        );
      } catch (err) {
        console.warn(
          'Não foi possível salvar o cache local:',
          err,
        );
      }
    },
    [],
  );

  const restoreCache = useCallback(async () => {
    try {
      const storedValue =
        await AsyncStorage.getItem(POSTS_CACHE_KEY);

      if (!storedValue) {
        return;
      }

      const cache =
        JSON.parse(storedValue) as PersistedPostsCache;

      if (
        !Array.isArray(cache.posts) ||
        typeof cache.fetchedAt !== 'number'
      ) {
        return;
      }

      setPosts(cache.posts);
      lastFetchedAtRef.current = cache.fetchedAt;
    } catch (err) {
      console.warn(
        'Não foi possível restaurar o cache local:',
        err,
      );
    }
  }, []);

  useEffect(() => {
    async function initializeStorage() {
      await restoreCache();

      setStorageReady(true);
    }

    initializeStorage();
  }, [restoreCache]);

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
    if (!storageReady) {
      return;
    }

    if (isCacheValid()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await fetchPosts();
      const fetchedAt = Date.now();

      setPosts(result);
      lastFetchedAtRef.current = fetchedAt;

      await persistCache(
        result,
        fetchedAt,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar as publicações.',
      );
    } finally {
      setLoading(false);
    }
  }, [
    fetchPosts,
    isCacheValid,
    persistCache,
    storageReady,
  ]);

  const refreshPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const result = await fetchPosts();
      const fetchedAt = Date.now();

      setPosts(result);
      lastFetchedAtRef.current = fetchedAt;

      await persistCache(
        result,
        fetchedAt,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível atualizar as publicações.',
      );
    } finally {
      setRefreshing(false);
    }
  }, [fetchPosts, persistCache]);

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