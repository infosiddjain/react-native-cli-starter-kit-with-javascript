import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppButton,
  AppInput,
  AppText,
  ScreenWrapper,
  Spacer,
} from '@/components';
import { STRINGS } from '@/constants/strings';
import { ROUTES } from '@/navigation/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAuthError, login, selectAuth } from '@/store/slices/authSlice';

export default function LoginScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const passwordRef = useRef(null);

  const onSubmit = () => {
    if (!username.trim() || !password) {
      setFormError(STRINGS.auth.required);
      return;
    }
    setFormError(null);
    // On success the RootNavigator switches to the app automatically.
    dispatch(login({ username: username.trim(), password }));
  };

  const onChange = setter => value => {
    setter(value);
    if (error) dispatch(clearAuthError());
    if (formError) setFormError(null);
  };

  return (
    <ScreenWrapper scroll keyboardAware contentContainerStyle={styles.center}>
      <AppText variant="h1">{STRINGS.auth.title}</AppText>
      <AppText color="textSecondary">{STRINGS.auth.subtitle}</AppText>
      <Spacer size="xxl" />

      <AppInput
        label={STRINGS.auth.username}
        leftIcon="user"
        value={username}
        onChangeText={onChange(setUsername)}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <AppInput
        ref={passwordRef}
        label={STRINGS.auth.password}
        value={password}
        onChangeText={onChange(setPassword)}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        error={formError || error}
      />

      <AppButton
        title={STRINGS.auth.login}
        onPress={onSubmit}
        loading={loading}
      />
      <View style={styles.hint}>
        <AppText variant="caption" color="textSecondary" align="center">
          {STRINGS.auth.demoHint}
        </AppText>
      </View>

      <View style={styles.footer}>
        <AppText color="textSecondary">{STRINGS.auth.noAccount}</AppText>
        <AppButton
          title={STRINGS.auth.createAccount}
          variant="ghost"
          size="sm"
          fullWidth={false}
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center' },
  hint: { marginTop: 16 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});
