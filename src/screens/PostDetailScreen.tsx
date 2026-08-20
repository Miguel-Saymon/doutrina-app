import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHTML from 'react-native-render-html';

import { getPosts } from '../api/blogger/bloggerClient';
import { RootStackParamList } from '../navigation/navigationTypes';
import { Post } from '../types/post';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'PostDetail'
>;

function isSupportedUrl(url: string): boolean {
  return (
    url.startsWith('https://') ||
    url.startsWith('http://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  );
}

export function PostDetailScreen({ route }: Props) {
  const { postId } = route.params;
  const { width } = useWindowDimensions();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);

        const posts = await getPosts();

        const foundPost =
          posts.find((item) => item.id === postId) ?? null;

        if (!foundPost) {
          throw new Error('Publicação não encontrada.');
        }

        setPost(foundPost);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar a publicação.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  async function handleLinkPress(
    _: unknown,
    href: string,
  ) {
    if (!href || !isSupportedUrl(href)) {
      return;
    }

    try {
      await Linking.openURL(href);
    } catch (err) {
      console.warn(
        'Não foi possível abrir o link:',
        href,
        err,
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />

        <Text style={styles.statusText}>
          Carregando artigo...
        </Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Não foi possível abrir o artigo.
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {post.title}
          </Text>

          {post.labels.length > 0 && (
            <Text style={styles.labels}>
              {post.labels.join(' · ')}
            </Text>
          )}
        </View>

        <View style={styles.separator} />

        <RenderHTML
          contentWidth={width - 48}
          source={{
            html: post.html,
          }}
          renderersProps={{
            a: {
              onPress: handleLinkPress,
            },
          }}
          baseStyle={styles.htmlBase}
          tagsStyles={{
            p: styles.htmlParagraph,
            h1: styles.htmlHeading,
            h2: styles.htmlHeading,
            h3: styles.htmlSubheading,
            li: styles.htmlListItem,
            blockquote: styles.htmlBlockquote,
            a: styles.htmlLink,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },

  header: {
    marginBottom: 22,
  },

  title: {
    fontSize: 27,
    lineHeight: 35,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#171717',
  },

  labels: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 19,
    color: '#737373',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 24,
    backgroundColor: '#D9D9D9',
  },

  htmlBase: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2B2B2B',
  },

  htmlParagraph: {
    marginTop: 0,
    marginBottom: 18,
  },

  htmlHeading: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '600',
    color: '#171717',
  },

  htmlSubheading: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '600',
    color: '#171717',
  },

  htmlListItem: {
    marginBottom: 8,
  },

  htmlBlockquote: {
    marginVertical: 18,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#D9D9D9',
    color: '#555555',
  },

  htmlLink: {
    textDecorationLine: 'underline',
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
});