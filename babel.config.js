module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    // Reads .env, then .env.<APP_ENV> (development / production) on top.
    // Use it only through src/constants/env.js.
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        envName: 'APP_ENV',
        safe: false,
        allowUndefined: true,
      },
    ],
    // Must stay last (needed by react-native-reanimated, used by the drawer).
    'react-native-worklets/plugin',
  ],
};
