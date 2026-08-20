import {
  Pressable,
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
  title?: string;
  message?: string | null;
  onRetry: () => void;
};

export function ErrorState({
  title = 'Não foi possível carregar.',
  message,
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {!!message && (
        <Text style={styles.message}>
          {message}
        </Text>
      )}

      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Tentar novamente
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text.primary,
  },

  message: {
    marginTop: spacing.sm,
    ...typography.small,
    textAlign: 'center',
    color: colors.text.secondary,
  },

  button: {
    marginTop: spacing.xl,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
    borderRadius: 8,
  },

  buttonPressed: {
    opacity: colors.action.pressedOpacity,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
});