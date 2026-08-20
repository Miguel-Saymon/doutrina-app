import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function GraduationScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Em breve.
          </Text>

          <Text style={styles.description}>
            Novidades virão. Aguarde enquanto a equipe do doutrina.net
            prepara novos conteúdos para esta seção.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },

  title: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#171717',
  },

  description: {
    marginTop: 12,
    maxWidth: 440,
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
});