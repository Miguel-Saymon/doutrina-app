import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { RootStackParamList } from '../navigation/navigationTypes';
import { getPostsByArea } from '../services/postClassifier';
import { Post } from '../types/post';
import { PostListScreen } from './PostListScreen';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AreaPosts'
>;

export function AreaPostsScreen({
  route,
  navigation,
}: Props) {
  const { area } = route.params;

  const filterPosts = useCallback(
    (posts: Post[]) => getPostsByArea(posts, area),
    [area],
  );

  return (
    <PostListScreen
      title={area}
      filterPosts={filterPosts}
      onOpenPost={(post) =>
        navigation.navigate('PostDetail', {
          postId: post.id,
        })
      }
    />
  );
}