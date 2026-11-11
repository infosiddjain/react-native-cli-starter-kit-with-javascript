module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|react-native-drawer-layout|react-native-reanimated|react-native-worklets|@react-native-vector-icons|immer|redux|@reduxjs|reselect|react-redux)/)',
  ],
};
