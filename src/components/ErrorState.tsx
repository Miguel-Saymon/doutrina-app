import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#171717',
  },

  message: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#737373',
  },

  button: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
    borderRadius: 8,
  },

  buttonPressed: {
    opacity: 0.55,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },
});