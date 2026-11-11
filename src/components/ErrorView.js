import React from 'react';
import { StyleSheet, View } from 'react-native';
import { STRINGS } from '@/constants/strings';
import AppText from './AppText';
import AppButton from './AppButton';

export default function ErrorView({ message, onRetry, style }) {
  return (
    <View style={[styles.container, style]}>
      <AppText variant="h3" align="center">
        {STRINGS.common.somethingWentWrong}
      </AppText>
      {message ? (
        <AppText color="textSecondary" align="center" style={styles.message}>
          {message}
        </AppText>
      ) : null}
      {onRetry ? (
        <AppButton
          title={STRINGS.common.retry}
          onPress={onRetry}
          variant="outline"
          fullWidth={false}
        />
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
  message: { marginTop: 8, marginBottom: 16 },
});
