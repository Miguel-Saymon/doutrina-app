import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import {
  colors,
  spacing,
  typography,
} from '../theme';

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
    borderBottomColor: colors.border,
  },

  pressed: {
    opacity: colors.action.pressedOpacity,
  },

  title: {
    flex: 1,
    paddingRight: spacing.lg,
    ...typography.listTitle,
    color: colors.text.primary,
  },

  arrow: {
    fontSize: 28,
    fontWeight: '300',
    color: '#8A8A8A',
  },
});