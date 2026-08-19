import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getPosts } from './src/api/blogger/bloggerClient';
import { Post } from './src/types/post';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const result = await getPosts();

        console.log('Posts recebidos:', result);
        setPosts(result);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar os artigos.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.statusText}>Carregando artigos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível carregar.</Text>
        <Text style={styles.statusText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>doutrina.net</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.preview}>
              {item.preview}
            </Text>

            {item.labels.length > 0 && (
              <Text style={styles.labels}>
                {item.labels.join(' · ')}
              </Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },

  header: {
    fontSize: 26,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  article: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },

  preview: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },

  labels: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.6,
  },

  statusText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },

  errorTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});