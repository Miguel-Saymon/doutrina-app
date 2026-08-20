import {
  ScrollView,
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

export function AboutScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.title}>
            Sobre o doutrina.net
          </Text>

          <Text style={styles.subtitle}>
            Conhecimento jurídico público, democrático e gratuito.
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.paragraph}>
            De vital importância para o estudo e para a prática do
            Direito, a doutrina jurídica é talvez a fonte com o acesso
            mais prejudicado.
          </Text>

          <Text style={styles.paragraph}>
            Seu conteúdo está disperso em inúmeras obras e publicações,
            muitas com uma lógica comercial e altos custos, que podem
            prejudicar o acesso irrestrito ao público.
          </Text>

          <Text style={styles.paragraph}>
            O doutrina.net é uma plataforma com a finalidade de
            contribuir para a democratização da doutrina e da produção
            acadêmica sobre o Direito, reunindo artigos e textos de
            professores e autoridades das diversas áreas das ciências
            jurídicas.
          </Text>

          <Text style={styles.paragraph}>
            O acesso é gratuito, mantido por meio de anúncios e
            patrocínios.
          </Text>

          <View style={styles.separator} />

          <Text style={styles.paragraph}>
            Quer publicar, patrocinar ou participar do doutrina.net?
            Entre em contato com a equipe responsável pela plataforma.
          </Text>

          <Text style={styles.paragraph}>
            Sinta-se à vontade para acessar e utilizar nosso acervo.
          </Text>

          <Text style={styles.signature}>
            Equipe do doutrina.net
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.section,
  },

  intro: {
    marginBottom: spacing.xxxl,
  },

  title: {
    ...typography.screenTitle,
    color: colors.text.primary,
  },

  subtitle: {
    marginTop: spacing.sm,
    maxWidth: 440,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text.secondary,
  },

  content: {
    maxWidth: 620,
  },

  paragraph: {
    marginBottom: spacing.xl,
    ...typography.articleBody,
    color: colors.text.body,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
    backgroundColor: colors.border,
  },

  signature: {
    marginTop: spacing.sm,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
});