import React from 'react';
import {
  AppText,
  ListItem,
  ScreenWrapper,
  Section,
  Spacer,
} from '@/components';
import { CONFIG } from '@/constants/config';

const STACK = [
  { title: 'React Native CLI', subtitle: 'JavaScript, no Expo' },
  { title: 'Redux Toolkit', subtitle: 'Slices + createApiThunk' },
  { title: 'React Navigation', subtitle: 'Stack, drawer, custom bottom tabs' },
  { title: 'Axios', subtitle: 'Shared client with interceptors' },
  { title: 'AsyncStorage', subtitle: 'storage helper + useStorage hook' },
];

export default function AboutScreen() {
  return (
    <ScreenWrapper scroll edges={['bottom']}>
      <AppText variant="h2">{CONFIG.APP_NAME}</AppText>
      <AppText color="textSecondary">Version {CONFIG.APP_VERSION}</AppText>
      <Spacer size="xl" />
      <Section title="Built with" card>
        {STACK.map(item => (
          <ListItem
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </Section>
    </ScreenWrapper>
  );
}
