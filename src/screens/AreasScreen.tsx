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
import { getAreasFromPosts } from '../services/postClassifier';
import {
  colors,
  spacing,
  typography,
} from '../theme';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Areas'
>;

export function AreasScreen({ navigation }: Props) {
  const {
    posts,
    loading,
    refreshing,
    error,
    refresh,
    retry,
  } = usePosts();

  const areas = getAreasFromPosts(posts);

  if (loading) {
    return (
      <LoadingState message="Carregando áreas..." />
    );
  }

  if (error && areas.length === 0) {
    return (
      <ErrorState
        title="Não foi possível carregar as áreas."
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
        data={areas}
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
              Selecione uma área do Direito para visualizar suas publicações.
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
            Nenhuma área foi identificada.
          </Text>
        }
        renderItem={({ item }) => (
          <NavigationListItem
            title={item}
            onPress={() =>
              navigation.navigate('AreaPosts', {
                area: item,
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

  introText: {
    ...typography.small,
    color: colors.text.secondary,
  },

  warning: {
    marginTop: spacing.sm,
    ...typography.caption,
    color: colors.text.secondary,
  },

  emptyText: {
    paddingVertical: spacing.xxl,
    fontSize: 15,
    color: colors.text.secondary,
  },
});