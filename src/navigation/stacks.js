import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from './routes';
import { rootScreenOptions, useHeaderOptions } from './options';
import { STRINGS } from '@/constants/strings';
import HomeScreen from '@/screens/home/HomeScreen';
import PostDetailScreen from '@/screens/home/PostDetailScreen';
import ComponentsScreen from '@/screens/components/ComponentsScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';

// One stack per tab, so each tab keeps its own back history.
const HomeStack = createNativeStackNavigator();
const ComponentsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export function HomeStackNavigator() {
  const headerOptions = useHeaderOptions();
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={rootScreenOptions(STRINGS.home.title)}
      />
      <HomeStack.Screen
        name={ROUTES.POST_DETAIL}
        component={PostDetailScreen}
        options={{ title: 'Post' }}
      />
    </HomeStack.Navigator>
  );
}

export function ComponentsStackNavigator() {
  const headerOptions = useHeaderOptions();
  return (
    <ComponentsStack.Navigator screenOptions={headerOptions}>
      <ComponentsStack.Screen
        name={ROUTES.COMPONENTS}
        component={ComponentsScreen}
        options={rootScreenOptions('Components')}
      />
    </ComponentsStack.Navigator>
  );
}

export function ProfileStackNavigator() {
  const headerOptions = useHeaderOptions();
  return (
    <ProfileStack.Navigator screenOptions={headerOptions}>
      <ProfileStack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={rootScreenOptions(STRINGS.profile.title)}
      />
    </ProfileStack.Navigator>
  );
}
