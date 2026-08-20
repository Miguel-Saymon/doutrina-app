import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  colors,
  spacing,
  typography,
} from '../theme';

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
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },

  title: {
    ...typography.screenTitle,
    color: colors.text.primary,
  },

  description: {
    marginTop: spacing.md,
    maxWidth: 440,
    ...typography.body,
    color: colors.text.muted,
  },
});