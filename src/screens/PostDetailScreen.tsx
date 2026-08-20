import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import {
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
import { LoadingState } from '../components/LoadingState';
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

  const contentWidth = Math.max(
    width - 48,
    0,
  );

  const computeEmbeddedMaxWidth = useMemo(
    () =>
      (availableWidth: number) =>
        availableWidth,
    [],
  );

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
      <LoadingState message="Carregando artigo..." />
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
        horizontal={false}
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
          contentWidth={contentWidth}
          source={{
            html: post.html,
          }}
          computeEmbeddedMaxWidth={
            computeEmbeddedMaxWidth
          }
          enableExperimentalBRCollapsing
          enableExperimentalGhostLinesPrevention
          renderersProps={{
            a: {
              onPress: handleLinkPress,
            },
            img: {
              enableExperimentalPercentWidth: true,
            },
          }}
          baseStyle={htmlBaseStyle}
          tagsStyles={htmlTagsStyles}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const htmlBaseStyle = {
  fontSize: 16,
  lineHeight: 26,
  color: '#2B2B2B',
};

const htmlTagsStyles = {
  body: {
    margin: 0,
    padding: 0,
  },

  p: {
    marginTop: 0,
    marginBottom: 18,
  },

  div: {
    maxWidth: '100%',
  },

  h1: {
    marginTop: 30,
    marginBottom: 14,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '600' as const,
    color: '#171717',
  },

  h2: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '600' as const,
    color: '#171717',
  },

  h3: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '600' as const,
    color: '#171717',
  },

  img: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: 12,
    marginBottom: 16,
  },

  table: {
    maxWidth: '100%',
  },

  blockquote: {
    marginTop: 18,
    marginBottom: 18,
    marginLeft: 0,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#D9D9D9',
    color: '#555555',
  },

  ul: {
    marginTop: 8,
    marginBottom: 18,
    paddingLeft: 20,
  },

  ol: {
    marginTop: 8,
    marginBottom: 18,
    paddingLeft: 20,
  },

  li: {
    marginBottom: 8,
  },

  a: {
    textDecorationLine: 'underline' as const,
  },
};

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