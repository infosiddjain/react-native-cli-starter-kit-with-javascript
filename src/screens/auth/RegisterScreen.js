import React, { useState } from 'react';
import { Alert } from 'react-native';

import { AppButton, AppInput, Dropdown, ScreenWrapper } from '@/components';
import { authService } from '@/api';
import { COUNTRIES } from '@/constants/options';
import { STRINGS } from '@/constants/strings';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = form => {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'Required';
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email';
  if (form.password.length < 6) errors.password = 'At least 6 characters';
  if (!form.country) errors.country = 'Pick a country';
  return errors;
};

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setField = key => value => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      // Calling a service directly is fine for one-off requests that no other screen needs.
      await authService.register(form);
      Alert.alert(STRINGS.auth.registerTitle, STRINGS.auth.registerSuccess);
      navigation.goBack();
    } catch (error) {
      Alert.alert(STRINGS.common.somethingWentWrong, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scroll keyboardAware edges={['bottom']}>
      <AppInput
        label={STRINGS.auth.firstName}
        value={form.firstName}
        onChangeText={setField('firstName')}
        error={errors.firstName}
      />
      <AppInput
        label={STRINGS.auth.lastName}
        value={form.lastName}
        onChangeText={setField('lastName')}
      />
      <AppInput
        label={STRINGS.auth.email}
        value={form.email}
        onChangeText={setField('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <AppInput
        label={STRINGS.auth.password}
        value={form.password}
        onChangeText={setField('password')}
        secureTextEntry
        error={errors.password}
      />
      <Dropdown
        label="Country"
        placeholder="Select your country"
        items={COUNTRIES}
        value={form.country}
        onChange={setField('country')}
        searchable
        leftIcon="globe"
        error={errors.country}
      />
      <AppButton
        title={STRINGS.auth.register}
        onPress={onSubmit}
        loading={loading}
      />
    </ScreenWrapper>
  );
}
