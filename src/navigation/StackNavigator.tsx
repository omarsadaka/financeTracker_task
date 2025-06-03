import React, {Suspense} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigator} from './BottomTabNavigator';
import {useLanguage} from '../lang/useLanguage';
import * as LazyScreens from './LazyScreen';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Splash} from '../screens/Splash';

const Stack = createNativeStackNavigator();

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export const RootStack = () => {
  const {locale} = useLanguage();
  return (
    <Suspense fallback={<Loading />}>
      <Stack.Navigator
        key={locale}
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
        }}
        initialRouteName="Splash">
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen
          name={'TransactionsList'}
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});
