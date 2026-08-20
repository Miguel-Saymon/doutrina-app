import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPosts } from '../api/blogger/bloggerClient';
import { RootStackParamList } from '../navigation/navigationTypes';
import { getPostsByArea } from '../services/postClassifier';
import { Post } from '../types/post';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AreaPosts'
>;

export function AreaPostsScreen({
  route,
  navigation,
}: Props) {
  const { area } = route.params;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const allPosts = await getPosts();

        const areaPosts = getPostsByArea(
          allPosts,
          area,
        );

        setPosts(areaPosts);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar as publicações.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [area]);

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

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Não foi possível carregar as publicações.
        </Text>

        <Text style={styles.statusText}>
          {error}
        </Text>
      </View>
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
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={styles.area}>
              {area}
            </Text>

            <Text style={styles.count}>
              {posts.length === 1
                ? '1 publicação'
                : `${posts.length} publicações`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma publicação encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('PostDetail', {
                postId: item.id,
              })
            }
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

  area: {
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

  errorTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#171717',
  },

  emptyText: {
    fontSize: 15,
    color: '#737373',
  },
});