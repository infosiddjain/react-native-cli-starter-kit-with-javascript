import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Divider,
  EmptyState,
  ListItem,
  ScreenWrapper,
  Tabs,
} from '@/components';

// Demo data. Replace with an API call + slice when you have a backend for it.
const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Welcome to StarterKit',
    body: 'Explore the Components tab.',
    unread: true,
  },
  {
    id: '2',
    title: 'New comment',
    body: 'Someone replied to your post.',
    unread: true,
  },
  {
    id: '3',
    title: 'Weekly summary',
    body: 'You read 12 posts this week.',
    unread: true,
  },
  {
    id: '4',
    title: 'Profile updated',
    body: 'Your changes were saved.',
    unread: false,
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  {
    key: 'unread',
    label: 'Unread',
    badge: NOTIFICATIONS.filter(n => n.unread).length,
  },
];

// Lives on the root stack, so it opens as a modal above the drawer and tabs.
export default function NotificationsScreen() {
  const [filter, setFilter] = useState('all');
  const data =
    filter === 'unread' ? NOTIFICATIONS.filter(n => n.unread) : NOTIFICATIONS;

  return (
    <ScreenWrapper padded={false} edges={['bottom']}>
      <Tabs
        items={FILTERS}
        value={filter}
        onChange={setFilter}
        variant="underline"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyState title="You're all caught up" />}
        renderItem={({ item }) => (
          <ListItem
            icon="bell"
            title={item.title}
            subtitle={item.body}
            selected={item.unread}
            onPress={() => {}}
          />
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: { flexGrow: 1, padding: 8 },
});
