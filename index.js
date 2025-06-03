import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import React from 'react'
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/useNavigationHook';

const AppContainer = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <App />
        </NavigationContainer>
     </PersistGate>
   </Provider>
   </GestureHandlerRootView>
  )
}

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <AppContainer />;
}

LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => HeadlessCheck);
