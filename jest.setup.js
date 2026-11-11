/* eslint-env jest */
require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

// The drawer runs on Reanimated, which needs native code. In tests a plain
// stack stands in for it so screens and navigation can still render.
jest.mock('@react-navigation/drawer', () => {
  const { ScrollView } = require('react-native');
  return {
    createDrawerNavigator: require('@react-navigation/native-stack')
      .createNativeStackNavigator,
    DrawerContentScrollView: ScrollView,
  };
});
