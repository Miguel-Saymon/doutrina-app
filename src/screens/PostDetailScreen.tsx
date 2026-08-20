import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
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

import { ErrorState } from '../components/ErrorState';
import { usePosts } from '../hooks/usePosts';
import { RootStackParamList } from '../navigation/navigationTypes';

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

  const {
    posts,
    loading,
    error,
    retry,
    getPostById,
  } = usePosts();

  const post = getPostById(postId);

  useEffect(() => {
    if (!loading && posts.length > 0 && !post) {
      console.warn(
        'Publicação não encontrada no cache:',
        postId,
      );
    }
  }, [loading, posts.length, post, postId]);

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

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />

        <Text style={styles.statusText}>
          Carregando artigo...
        </Text>
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <ErrorState
        title="Não foi possível abrir o artigo."
        message={error}
        onRetry={retry}
      />
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Publicação não encontrada.
        </Text>

        <Text style={styles.statusText}>
          Atualize a listagem e tente novamente.
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