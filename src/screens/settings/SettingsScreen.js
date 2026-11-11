import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  AppInput,
  AppText,
  Dropdown,
  ListItem,
  ScreenWrapper,
  Section,
  ThemeSwitcher,
} from '@/components';
import { LANGUAGES } from '@/constants/options';
import { AUTH_STORAGE_KEYS, STORAGE_KEYS } from '@/constants/storageKeys';
import { STRINGS } from '@/constants/strings';
import { useAppDispatch, useStorage } from '@/hooks';
import { loadThemeMode } from '@/store/slices/themeSlice';
import { storage } from '@/utils/storage';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useStorage(STORAGE_KEYS.LANGUAGE, 'en');
  const [note, setNote, { remove: removeNote }] = useStorage(
    STORAGE_KEYS.NOTE,
    '',
  );
  const [keyCount, setKeyCount] = useState(0);

  const refreshKeyCount = () =>
    storage.keys().then(keys => setKeyCount(keys.length));

  useEffect(() => {
    refreshKeyCount();
  }, [language, note]);

  const clearData = () =>
    Alert.alert(STRINGS.settings.clearData, STRINGS.settings.clearDataConfirm, [
      { text: STRINGS.common.cancel, style: 'cancel' },
      {
        text: STRINGS.settings.clearData,
        style: 'destructive',
        onPress: async () => {
          await storage.clear({ keep: AUTH_STORAGE_KEYS });
          removeNote();
          setLanguage('en');
          dispatch(loadThemeMode());
          refreshKeyCount();
          Alert.alert(STRINGS.settings.cleared);
        },
      },
    ]);

  return (
    <ScreenWrapper scroll keyboardAware edges={['bottom']}>
      <Section title={STRINGS.settings.appearance}>
        <ThemeSwitcher />
      </Section>

      <Section title={STRINGS.settings.preferences}>
        <Dropdown
          label={STRINGS.settings.language}
          items={LANGUAGES}
          value={language}
          onChange={setLanguage}
          leftIcon="globe"
          hint="Saved on this device"
        />
      </Section>

      <Section title={STRINGS.settings.storage}>
        <AppInput
          label={STRINGS.settings.note}
          value={note}
          onChangeText={setNote}
          placeholder="Type something..."
          multiline
          hint={STRINGS.settings.noteHint}
        />
        <AppText variant="caption" color="textSecondary">
          {keyCount} keys saved on this device
        </AppText>
      </Section>

      <Section card>
        <ListItem
          icon="trash"
          title={STRINGS.settings.clearData}
          destructive
          onPress={clearData}
        />
      </Section>
    </ScreenWrapper>
  );
}
