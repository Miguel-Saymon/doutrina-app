import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { RootStackParamList } from '../navigation/navigationTypes';
import { getAreasFromPosts } from '../services/postClassifier';

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
      <View style={styles.center}>
        <ActivityIndicator />

        <Text style={styles.statusText}>
          Carregando áreas...
        </Text>
      </View>
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
          <Pressable
            style={({ pressed }) => [
              styles.area,
              pressed && styles.areaPressed,
            ]}
            onPress={() =>
              navigation.navigate('AreaPosts', {
                area: item,
              })
            }
          >
            <Text style={styles.areaName}>
              {item}
            </Text>

            <Text style={styles.arrow}>
              ›
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

  area: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },

  areaPressed: {
    opacity: 0.55,
  },

  areaName: {
    flex: 1,
    paddingRight: 16,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '500',
    color: '#171717',
  },

  arrow: {
    fontSize: 28,
    fontWeight: '300',
    color: '#8A8A8A',
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
    paddingVertical: 24,
    fontSize: 15,
    color: '#737373',
  },
});