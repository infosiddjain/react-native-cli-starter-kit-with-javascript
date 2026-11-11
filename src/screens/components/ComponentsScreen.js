import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppButton,
  AppInput,
  AppText,
  Badge,
  BottomSheet,
  Dropdown,
  Icon,
  IconButton,
  ListItem,
  ScreenWrapper,
  Section,
  Spacer,
  Tabs,
} from '@/components';
import { COUNTRIES, TOPICS } from '@/constants/options';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { useStorage } from '@/hooks';

const CONTENT_TABS = [
  { key: 'overview', label: 'Overview', icon: 'info' },
  { key: 'activity', label: 'Activity', badge: 4 },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

const SEGMENTS = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

const TAB_CONTENT = {
  overview:
    'Underline tabs switch content inside one screen without navigation.',
  activity: 'Tabs can show a badge, like unread counts.',
  settings: 'Tabs can show an icon next to the label.',
};

// Living catalog of the shared components. Copy any block into your screens.
export default function ComponentsScreen() {
  const [country, setCountry] = useState(null);
  // These two are saved on the device: leave the app and come back, they stay.
  const [topics, setTopics] = useStorage(STORAGE_KEYS.FAVORITE_TOPICS, []);
  const [contentTab, setContentTab] = useState('overview');
  const [segment, setSegment] = useState('week');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <ScreenWrapper scroll edges={[]}>
      <Section title="Dropdown">
        <Dropdown
          label="Country (searchable)"
          placeholder="Select a country"
          items={COUNTRIES}
          value={country}
          onChange={setCountry}
          searchable
          leftIcon="globe"
        />
        <Dropdown
          label="Favorite topics (multi-select, saved locally)"
          placeholder="Pick topics"
          items={TOPICS}
          value={topics}
          onChange={setTopics}
          multiple
          hint="Stored with useStorage. Restart the app and they are still here."
        />
        <Dropdown
          label="Disabled"
          placeholder="Not available"
          items={[]}
          disabled
        />
      </Section>

      <Section title="Tabs">
        <Tabs items={SEGMENTS} value={segment} onChange={setSegment} />
        <Spacer size="lg" />
        <Tabs
          items={CONTENT_TABS}
          value={contentTab}
          onChange={setContentTab}
          variant="underline"
        />
        <AppText color="textSecondary" style={styles.tabContent}>
          {TAB_CONTENT[contentTab]}
        </AppText>
      </Section>

      <Section title="Bottom sheet">
        <AppButton
          title="Open bottom sheet"
          variant="secondary"
          onPress={() => setSheetOpen(true)}
        />
      </Section>

      <Section title="Buttons">
        <View style={styles.gap}>
          <AppButton title="Primary" />
          <AppButton title="Secondary" variant="secondary" />
          <AppButton title="Outline" variant="outline" />
          <AppButton title="Danger" variant="danger" />
          <AppButton title="Loading" loading />
        </View>
      </Section>

      <Section
        title="Vector icons"
        description="Ionicons by default. App names map to outline/filled pairs; any icon-set name also works."
      >
        <View style={styles.row}>
          <Icon name="home" color="primary" />
          <Icon name="home" filled color="primary" />
          <Icon name="heart" filled color="error" />
          <Icon name="star" filled color="warning" />
          <Icon name="rocket-outline" />
          <Icon family="material" name="react" color="#61DAFB" size={26} />
          <Icon
            family="material"
            name="language-javascript"
            color="#F7DF1E"
            size={26}
          />
          <Icon family="material" name="github" size={26} />
        </View>
      </Section>

      <Section title="Icon buttons and badges">
        <View style={styles.row}>
          <IconButton name="bell" badge={5} />
          <IconButton name="search" variant="filled" color="primary" />
          <IconButton name="trash" color="error" />
          <Badge value={3} />
          <Badge value={120} variant="primary" />
          <Badge value="New" variant="success" />
        </View>
      </Section>

      <Section title="Inputs">
        <AppInput
          label="With icon"
          placeholder="Search posts"
          leftIcon="search"
        />
        <AppInput
          label="With error"
          value="wrong@"
          error="Enter a valid email"
        />
      </Section>

      <Section title="List items" card>
        <ListItem
          icon="user"
          title="Account"
          subtitle="Name, email, photo"
          showChevron
          onPress={() => {}}
        />
        <ListItem
          icon="bell"
          title="Notifications"
          right={<Badge value={2} />}
          onPress={() => {}}
        />
        <ListItem
          icon="trash"
          title="Delete account"
          destructive
          onPress={() => {}}
        />
      </Section>

      <BottomSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Share post"
        footer={<AppButton title="Done" onPress={() => setSheetOpen(false)} />}
      >
        <View style={styles.sheetBody}>
          <AppText color="textSecondary">
            Put any content here: actions, filters, forms. Tap outside or swipe
            the system back gesture to close.
          </AppText>
          <Spacer size="md" />
          <ListItem
            icon="layers"
            title="Copy link"
            onPress={() => setSheetOpen(false)}
          />
          <ListItem
            icon="globe"
            title="Open in browser"
            onPress={() => setSheetOpen(false)}
          />
        </View>
      </BottomSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  gap: { gap: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  tabContent: { paddingTop: 12 },
  sheetBody: { paddingHorizontal: 16 },
});
