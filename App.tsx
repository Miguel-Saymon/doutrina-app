import { StatusBar } from 'expo-status-bar';

import { PostsProvider } from './src/contexts/PostsContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <PostsProvider>
      <StatusBar style="dark" />

      <RootNavigator />
    </PostsProvider>
  );
}