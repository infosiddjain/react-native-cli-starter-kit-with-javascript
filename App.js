import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '@/store';
import RootNavigator from '@/navigation/RootNavigator';

function App() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={store}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });

export default App;
