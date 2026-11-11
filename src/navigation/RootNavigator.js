import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from './routes';
import { navigationRef } from './navigationRef';
import { useHeaderOptions } from './options';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';
import { Loader } from '@/components';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { restoreSession, selectIsLoggedIn } from '@/store/slices/authSlice';
import { loadThemeMode } from '@/store/slices/themeSlice';
import NotificationsScreen from '@/screens/notifications/NotificationsScreen';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const headerOptions = useHeaderOptions();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isBootstrapped = useAppSelector(state => state.auth.isBootstrapped);

  useEffect(() => {
    dispatch(loadThemeMode());
    dispatch(restoreSession());
  }, [dispatch]);

  // Map our theme onto React Navigation so headers, drawer and tabs match.
  const navTheme = useMemo(() => {
    const baseNav = theme.dark ? DarkTheme : DefaultTheme;
    return {
      ...baseNav,
      dark: theme.dark,
      colors: {
        ...baseNav.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.error,
      },
    };
  }, [theme.dark, theme.colors]);

  if (!isBootstrapped) {
    return <Loader fullScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
      />
      <RootStack.Navigator
        screenOptions={{ ...headerOptions, headerShown: false }}
      >
        {isLoggedIn ? (
          <>
            <RootStack.Screen name={ROUTES.APP_DRAWER} component={AppDrawer} />
            {/* Global screens: reachable from anywhere, shown above the drawer and tabs. */}
            <RootStack.Group
              screenOptions={{ presentation: 'modal', headerShown: true }}
            >
              <RootStack.Screen
                name={ROUTES.NOTIFICATIONS}
                component={NotificationsScreen}
                options={{ title: 'Notifications' }}
              />
            </RootStack.Group>
          </>
        ) : (
          <RootStack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
