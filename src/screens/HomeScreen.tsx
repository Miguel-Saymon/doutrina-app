import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation/navigationTypes';
import {
  colors,
  spacing,
  typography,
} from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type NavigationCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

function NavigationCard({
  title,
  description,
  onPress,
}: NavigationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          <Text style={styles.cardDescription}>
            {description}
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </View>
    </Pressable>
  );
}

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>
            doutrina.net
          </Text>

          <Text style={styles.subtitle}>
            Público · Democrático · Gratuito
          </Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introTitle}>
            Conhecimento jurídico ao seu alcance.
          </Text>

          <Text style={styles.introText}>
            Explore o acervo por autor, área do Direito ou conteúdos
            produzidos na graduação.
          </Text>
        </View>

        <View style={styles.navigation}>
          <NavigationCard
            title="Autores"
            description="Explore publicações por autor"
            onPress={() => navigation.navigate('Authors')}
          />

          <NavigationCard
            title="Áreas do Direito"
            description="Navegue pelas áreas jurídicas"
            onPress={() => navigation.navigate('Areas')}
          />

          <NavigationCard
            title="Graduação"
            description="Conteúdos acadêmicos em desenvolvimento"
            onPress={() => navigation.navigate('Graduation')}
          />

          <NavigationCard
            title="Sobre Nós"
            description="Conheça o propósito do doutrina.net"
            onPress={() => navigation.navigate('About')}
          />
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
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.huge,
  },

  header: {
    marginBottom: spacing.hero,
  },

  brand: {
    ...typography.brand,
    color: colors.text.primary,
  },

  subtitle: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.text.secondary,
  },

  intro: {
    maxWidth: 440,
    marginBottom: 38,
  },

  introTitle: {
    ...typography.heroTitle,
    color: colors.text.primary,
  },

  introText: {
    marginTop: spacing.md,
    ...typography.body,
    color: colors.text.muted,
  },

  navigation: {
    gap: 2,
  },

  card: {
    paddingVertical: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  cardPressed: {
    opacity: colors.action.pressedOpacity,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardText: {
    flex: 1,
    paddingRight: spacing.xl,
  },

  cardTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
  },

  cardDescription: {
    marginTop: 5,
    ...typography.small,
    color: colors.text.secondary,
  },

  arrow: {
    fontSize: 30,
    fontWeight: '300',
    color: '#8A8A8A',
  },
});