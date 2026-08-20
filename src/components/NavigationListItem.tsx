import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export function NavigationListItem({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },

  pressed: {
    opacity: 0.55,
  },

  title: {
    flex: 1,
    paddingRight: 16,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '500',
    color: '#171717',
  },

  arrow: {
    fontSize: 28,
    fontWeight: '300',
    color: '#8A8A8A',
  },
});