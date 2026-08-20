import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
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

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

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
        <View style={styles.brandSection}>
          <View style={styles.logoViewport}>
            <Image
              source={require('../../assets/images/doutrina-logo.png')}
              style={styles.logo}
              resizeMode="contain"
              accessible
              accessibilityLabel="doutrina.net"
            />
          </View>

          <View style={styles.tagline}>
            <Text style={styles.taglineText}>
              Público
            </Text>

            <Text style={styles.taglineDot}>
              •
            </Text>

            <Text style={styles.taglineText}>
              Democrático
            </Text>

            <Text style={styles.taglineDot}>
              •
            </Text>

            <Text style={styles.taglineText}>
              Gratuito
            </Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introEyebrow}>
            ACERVO JURÍDICO
          </Text>

          <Text style={styles.introTitle}>
            Conhecimento jurídico{'\n'}
            ao seu alcance.
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
            onPress={() =>
              navigation.navigate('Authors')
            }
          />

          <NavigationCard
            title="Áreas do Direito"
            description="Navegue pelas áreas jurídicas"
            onPress={() =>
              navigation.navigate('Areas')
            }
          />

          <NavigationCard
            title="Graduação"
            description="Conteúdos acadêmicos em desenvolvimento"
            onPress={() =>
              navigation.navigate('Graduation')
            }
          />

          <NavigationCard
            title="Sobre Nós"
            description="Conheça o propósito do doutrina.net"
            onPress={() =>
              navigation.navigate('About')
            }
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
    paddingTop: spacing.md,
    paddingBottom: spacing.section,
  },

  brandSection: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xxxl,
  },

  logoViewport: {
    width: '100%',
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  logo: {
    width: 320,
    height: 226,
  },

  tagline: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  taglineText: {
    ...typography.small,
    color: colors.text.secondary,
  },

  taglineDot: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    fontWeight: '700',
    color: colors.brand.primary,
  },

  intro: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },

  introEyebrow: {
    marginBottom: spacing.md,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textAlign: 'center',
    color: colors.brand.primary,
  },

  introTitle: {
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '600',
    letterSpacing: -0.45,
    textAlign: 'center',
    color: colors.text.primary,
  },

  introText: {
    marginTop: spacing.lg,
    maxWidth: 360,
    ...typography.body,
    textAlign: 'center',
    color: colors.text.muted,
  },

  navigation: {
    gap: spacing.sm,
  },

  card: {
    minHeight: 96,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 12,
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
    marginTop: spacing.xs,
    ...typography.small,
    color: colors.text.secondary,
  },

  arrow: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '400',
    color: colors.brand.primary,
  },
});