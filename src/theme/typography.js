import { Platform } from 'react-native';

const fontFamily = Platform.select({ ios: 'System', android: 'sans-serif' });

export const typography = {
  h1: { fontFamily, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  h2: { fontFamily, fontSize: 22, lineHeight: 28, fontWeight: '700' },
  h3: { fontFamily, fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontFamily, fontSize: 16, lineHeight: 22, fontWeight: '400' },
  bodyBold: { fontFamily, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  caption: { fontFamily, fontSize: 13, lineHeight: 18, fontWeight: '400' },
  button: { fontFamily, fontSize: 16, lineHeight: 20, fontWeight: '600' },
};
