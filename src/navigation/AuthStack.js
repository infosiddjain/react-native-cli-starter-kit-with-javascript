import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { useHeaderOptions } from './options';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const headerOptions = useHeaderOptions();
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={headerOptions}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Create account' }}
      />
    </Stack.Navigator>
  );
}
