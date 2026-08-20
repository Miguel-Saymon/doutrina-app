import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
};

export function CategoryPlaceholderScreen({ title }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.text}>
          Esta seção será implementada na próxima etapa.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#171717',
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#737373',
  },
});