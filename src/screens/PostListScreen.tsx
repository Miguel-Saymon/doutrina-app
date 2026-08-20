import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '../components/ErrorState';
import { usePosts } from '../hooks/usePosts';
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
      <View style={styles.center}>
        <ActivityIndicator />

        <Text style={styles.statusText}>
          Carregando publicações...
        </Text>
      </View>
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
          <Pressable
            onPress={() => onOpenPost(item)}
            style={({ pressed }) => [
              styles.article,
              pressed && styles.articlePressed,
            ]}
          >
            <Text style={styles.title}>
              {item.title}
            </Text>

            {!!item.preview && (
              <Text style={styles.preview}>
                {item.preview}
              </Text>
            )}

            <Text style={styles.readMore}>
              Ler artigo
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  list: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  intro: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  contextTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '600',
    color: '#171717',
  },

  count: {
    marginTop: 6,
    fontSize: 14,
    color: '#737373',
  },

  warning: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
    color: '#737373',
  },

  article: {
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },

  articlePressed: {
    opacity: 0.55,
  },

  title: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    color: '#171717',
  },

  preview: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: '#666666',
  },

  readMore: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  statusText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#737373',
  },

  emptyText: {
    fontSize: 15,
    color: '#737373',
  },
});