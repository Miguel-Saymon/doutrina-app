import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    backgroundColor: '#FFFFFF',
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },

  intro: {
    marginBottom: 34,
  },

  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#171717',
  },

  subtitle: {
    marginTop: 8,
    maxWidth: 440,
    fontSize: 15,
    lineHeight: 22,
    color: '#737373',
  },

  content: {
    maxWidth: 620,
  },

  paragraph: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 26,
    color: '#333333',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    marginTop: 4,
    marginBottom: 24,
    backgroundColor: '#D9D9D9',
  },

  signature: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
});