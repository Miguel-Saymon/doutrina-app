import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  message: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#737373',
  },
});