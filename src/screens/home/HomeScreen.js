import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import {
  AppText,
  Card,
  EmptyState,
  ErrorView,
  Loader,
  ScreenWrapper,
  Spacer,
} from '@/components';
import { ROUTES } from '@/navigation/routes';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { fetchPosts, selectPosts } from '@/store/slices/postsSlice';
import { truncate } from '@/utils/helpers';

export default function HomeScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const { colors, spacing } = useTheme();
  const { items, loading, loadingMore, refreshing, error } =
    useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts({ refresh: true }));
  }, [dispatch]);

  const onRefresh = useCallback(
    () => dispatch(fetchPosts({ refresh: true })),
    [dispatch],
  );
  const onEndReached = useCallback(() => dispatch(fetchPosts()), [dispatch]);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() => navigation.navigate(ROUTES.POST_DETAIL, { id: item.id })}
      >
        <AppText variant="h3">{item.title}</AppText>
        <Spacer size="xs" />
        <AppText color="textSecondary">{truncate(item.body, 110)}</AppText>
      </Card>
    ),
    [navigation],
  );

  if (loading && !items.length) {
    return <Loader fullScreen />;
  }
  if (error && !items.length) {
    return <ErrorView message={error} onRetry={onRefresh} />;
  }

  return (
    <ScreenWrapper padded={false} edges={[]}>
      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { padding: spacing.lg }]}
        ItemSeparatorComponent={Separator}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={loadingMore ? <Loader /> : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </ScreenWrapper>
  );
}

const Separator = () => <Spacer size="md" />;

const styles = StyleSheet.create({
  list: { flexGrow: 1 },
});
