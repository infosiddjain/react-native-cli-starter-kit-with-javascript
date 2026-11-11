import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppText,
  ErrorView,
  Loader,
  ScreenWrapper,
  Spacer,
} from '@/components';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import {
  clearSelectedPost,
  fetchPostById,
  selectPosts,
} from '@/store/slices/postsSlice';

export default function PostDetailScreen({ route }) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { colors, radius, spacing } = useTheme();
  const { selected, selectedLoading, selectedError } =
    useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  if (selectedLoading || (!selected && !selectedError)) {
    return <Loader fullScreen />;
  }
  if (selectedError) {
    return (
      <ErrorView
        message={selectedError}
        onRetry={() => dispatch(fetchPostById(id))}
      />
    );
  }

  return (
    <ScreenWrapper scroll edges={['bottom']}>
      <AppText variant="h2">{selected.title}</AppText>
      <Spacer size="md" />
      <View style={styles.tags}>
        {selected.tags?.map(tag => (
          <View
            key={tag}
            style={[
              styles.tag,
              {
                backgroundColor: colors.primaryMuted,
                borderRadius: radius.full,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <AppText variant="caption" color="primary">
              #{tag}
            </AppText>
          </View>
        ))}
      </View>
      <Spacer size="lg" />
      <AppText>{selected.body}</AppText>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingVertical: 4 },
});
