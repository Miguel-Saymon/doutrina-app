import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PostListItem } from '../components/PostListItem';
import { usePosts } from '../hooks/usePosts';
import {
  colors,
  spacing,
  typography,
} from '../theme';
import { Post } from '../types/post';

type Props = {
  title: string;
  emptyMessage?: string;
  filterPosts: (posts: Post[]) => Post[];
  onOpenPost: (post: Post) => void;
};

export function PostListScreen({
  title,
  emptyMessage = 'Nenhuma publicação encontrada.',
  filterPosts,
  onOpenPost,
}: Props) {
  const {
    posts: allPosts,
    loading,
    refreshing,
    error,
    refresh,
    retry,
  } = usePosts();

  const posts = filterPosts(allPosts);

  if (loading) {
    return (
      <LoadingState message="Carregando publicações..." />
    );
  }

  if (error && posts.length === 0) {
    return (
      <ErrorState
        title="Não foi possível carregar as publicações."
        message={error}
        onRetry={retry}
      />
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={styles.contextTitle}>
              {title}
            </Text>

            <Text style={styles.count}>
              {posts.length === 1
                ? '1 publicação'
                : `${posts.length} publicações`}
            </Text>

            {!!error && (
              <Text style={styles.warning}>
                Não foi possível atualizar agora. Exibindo os dados já carregados.
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {emptyMessage}
          </Text>
        }
        renderItem={({ item }) => (
          <PostListItem
            post={item}
            onPress={() => onOpenPost(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.huge,
  },

  intro: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },

  contextTitle: {
    ...typography.sectionTitle,
    color: colors.text.primary,
  },

  count: {
    marginTop: 6,
    ...typography.small,
    color: colors.text.secondary,
  },

  warning: {
    marginTop: spacing.sm,
    ...typography.caption,
    color: colors.text.secondary,
  },

  emptyText: {
    fontSize: 15,
    color: colors.text.secondary,
  },
});