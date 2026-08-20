import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { RootStackParamList } from '../navigation/navigationTypes';
import { getPostsByAuthor } from '../services/postClassifier';
import { Post } from '../types/post';
import { PostListScreen } from './PostListScreen';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AuthorPosts'
>;

export function AuthorPostsScreen({
  route,
  navigation,
}: Props) {
  const { author } = route.params;

  const filterPosts = useCallback(
    (posts: Post[]) => getPostsByAuthor(posts, author),
    [author],
  );

  return (
    <PostListScreen
      title={author}
      filterPosts={filterPosts}
      onOpenPost={(post) =>
        navigation.navigate('PostDetail', {
          postId: post.id,
        })
      }
    />
  );
}