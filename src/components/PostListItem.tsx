import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { colors, spacing, typography } from '../theme';
import { Post } from '../types/post';

type Props = {
  post: Post;
  onPress: () => void;
};

export function PostListItem({
  post,
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
        {post.title}
      </Text>

      {!!post.preview && (
        <Text style={styles.preview}>
          {post.preview}
        </Text>
      )}

      <Text style={styles.readMore}>
        Ler artigo
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  pressed: {
    opacity: colors.action.pressedOpacity,
  },

  title: {
    ...typography.postTitle,
    color: colors.text.primary,
  },

  preview: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text.muted,
  },

  readMore: {
    marginTop: spacing.md,
    fontSize: 13,
    fontWeight: '600',
    color: colors.action.primary,
  },
});