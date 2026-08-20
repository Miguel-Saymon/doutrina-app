import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  colors,
  spacing,
  typography,
} from '../theme';

type Props = {
  message?: string;
};

export function LoadingState({
  message = 'Carregando...',
}: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },

  message: {
    marginTop: spacing.sm,
    ...typography.small,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});