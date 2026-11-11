import React from 'react';
import { View } from 'react-native';
import { spacing } from '@/theme/spacing';

// <Spacer size="lg" /> for vertical space, <Spacer size="sm" horizontal /> for horizontal.
export default function Spacer({ size = 'md', horizontal = false }) {
  const value = typeof size === 'number' ? size : spacing[size];
  return <View style={horizontal ? { width: value } : { height: value }} />;
}
