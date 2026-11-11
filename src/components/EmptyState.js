import React from 'react';
import { StyleSheet, View } from 'react-native';
import { STRINGS } from '@/constants/strings';
import AppText from './AppText';

export default function EmptyState({
  title = STRINGS.common.noData,
  subtitle,
}) {
  return (
    <View style={styles.container}>
      <AppText variant="h3" align="center">
        {title}
      </AppText>
      {subtitle ? (
        <AppText color="textSecondary" align="center" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  subtitle: { marginTop: 8 },
});
