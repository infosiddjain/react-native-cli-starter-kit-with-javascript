import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { ROUTES } from './routes';
import CustomTabBar from './components/CustomTabBar';
import {
  ComponentsStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
} from './stacks';

const Tab = createBottomTabNavigator();

// Screens that hide the bottom bar (detail pages, forms, etc).
const HIDE_TAB_BAR_ON = [ROUTES.POST_DETAIL];

const tabOptions = ({ route }) => ({
  headerShown: false,
  tabBarVisible: !HIDE_TAB_BAR_ON.includes(getFocusedRouteNameFromRoute(route)),
});

const renderTabBar = props => <CustomTabBar {...props} />;

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={tabOptions}>
      <Tab.Screen
        name={ROUTES.HOME_STACK}
        component={HomeStackNavigator}
        options={{ title: 'Home', icon: 'home' }}
      />
      <Tab.Screen
        name={ROUTES.COMPONENTS_STACK}
        component={ComponentsStackNavigator}
        options={{ title: 'Components', icon: 'grid' }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE_STACK}
        component={ProfileStackNavigator}
        options={{ title: 'Profile', icon: 'user', tabBarBadge: 1 }}
      />
    </Tab.Navigator>
  );
}
