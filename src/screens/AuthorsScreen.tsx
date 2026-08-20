import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { NavigationListItem } from '../components/NavigationListItem';
import { usePosts } from '../hooks/usePosts';
import { RootStackParamList } from '../navigation/navigationTypes';
import { getAuthorsFromPosts } from '../services/postClassifier';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Authors'
>;

export function AuthorsScreen({ navigation }: Props) {
  const {
    posts,
    loading,
    refreshing,
    error,
    refresh,
    retry,
  } = usePosts();

  const authors = getAuthorsFromPosts(posts);

  if (loading) {
    return (
      <LoadingState message="Carregando autores..." />
    );
  }

  if (error && authors.length === 0) {
    return (
      <ErrorState
        title="Não foi possível carregar os autores."
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
        data={authors}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Selecione um autor para visualizar suas publicações.
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
            Nenhum autor foi identificado.
          </Text>
        }
        renderItem={({ item }) => (
          <NavigationListItem
            title={item}
            onPress={() =>
              navigation.navigate('AuthorPosts', {
                author: item,
              })
            }
          />
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

  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#737373',
  },

  warning: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
    color: '#737373',
  },

  emptyText: {
    paddingVertical: 24,
    fontSize: 15,
    color: '#737373',
  },
});