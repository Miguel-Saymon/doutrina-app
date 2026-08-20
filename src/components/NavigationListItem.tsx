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
      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.arrow}>
          ›
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  pressed: {
    opacity: colors.action.pressedOpacity,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    paddingRight: spacing.lg,
    ...typography.listTitle,
    color: colors.text.primary,
  },

  arrow: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '400',
    color: colors.brand.primary,
  },
});