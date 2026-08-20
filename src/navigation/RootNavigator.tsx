import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AboutScreen } from '../screens/AboutScreen';
import { AreaPostsScreen } from '../screens/AreaPostsScreen';
import { AreasScreen } from '../screens/AreasScreen';
import { AuthorPostsScreen } from '../screens/AuthorPostsScreen';
import { AuthorsScreen } from '../screens/AuthorsScreen';
import { GraduationScreen } from '../screens/GraduationScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#171717',
    border: '#E5E5E5',
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Home"
        screenOptions={{
          headerShadowVisible: false,
          headerBackTitle: 'Voltar',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Authors"
          component={AuthorsScreen}
          options={{
            title: 'Autores',
          }}
        />

        <Stack.Screen
          name="AuthorPosts"
          component={AuthorPostsScreen}
          options={{
            title: 'Publicações',
          }}
        />

        <Stack.Screen
          name="Areas"
          component={AreasScreen}
          options={{
            title: 'Áreas do Direito',
          }}
        />

        <Stack.Screen
          name="AreaPosts"
          component={AreaPostsScreen}
          options={{
            title: 'Publicações',
          }}
        />

        <Stack.Screen
          name="Graduation"
          component={GraduationScreen}
          options={{
            title: 'Graduação',
          }}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'Sobre Nós',
          }}
        />

        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{
            title: 'Artigo',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}