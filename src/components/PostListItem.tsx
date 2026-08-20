import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

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
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },

  pressed: {
    opacity: 0.55,
  },

  title: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    color: '#171717',
  },

  preview: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: '#666666',
  },

  readMore: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },
});