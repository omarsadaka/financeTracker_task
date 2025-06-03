import React, {useCallback} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as screens from '../screens';
import {
  Colors,
  RFValue,
  Text,
  TouchableOpacity,
  View,
  VectorIcons,
  SW,
  SH,
} from '../UI';
import {useLanguage} from '../lang/useLanguage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, StyleSheet} from 'react-native';

const BottomTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  const {t, locale} = useLanguage();
  let routes =
    locale == 'ar'
      ? [
          {
            component: screens.SummaryView,
            name: 'SummaryView',
            key: 'SummaryView',
            title: t('Navigation.summaryView'),
            icon: 'file1',
          },
          {
            component: screens.AddTransaction,
            name: 'AddTransaction',
            key: 'AddTransaction',
            title: t('Navigation.addTransaction'),
            icon: 'pluscircle',
          },
          {
            component: screens.TransactionsList,
            name: 'TransactionsList',
            key: 'TransactionsList',
            title: t('Navigation.transactions'),
            icon: 'filetext1',
          },
        ]
      : [
          {
            component: screens.TransactionsList,
            key: 'TransactionsList',
            name: 'TransactionsList',
            title: t('Navigation.transactions'),
            icon: 'filetext1',
          },
          {
            component: screens.AddTransaction,
            name: 'AddTransaction',
            key: 'AddTransaction',
            title: t('Navigation.addTransaction'),
            icon: 'pluscircle',
          },
          {
            component: screens.SummaryView,
            name: 'SummaryView',
            key: 'SummaryView',
            title: t('Navigation.summaryView'),
            icon: 'file1',
          },
        ];

  const RenderTabBar = useCallback(
    ({state, navigation}: {state: any; navigation: any}) => {
      const tabs = routes;

      return (
        <SafeAreaView
          edges={['bottom']}
          style={{
            // ...shadowStyle,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Colors().App.WHITE,
            elevation: 20,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.3,
          }}>
          {tabs.map((route: any, index: number) => {
            const isFocused = state.index === index;

            const onPress = async () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <>
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={{
                    height: RFValue(75),
                    flex: 1,
                    alignItems: 'center',
                  }}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View
                    style={{
                      paddingTop: RFValue(3),
                      borderColor: isFocused
                        ? Colors().App.BLUE_70
                        : Colors().App.WHITE,
                      height: '100%',
                    }}>
                    <VectorIcons
                      icon="AntDesign"
                      name={route.icon}
                      size={RFValue(30)}
                      color={
                        isFocused ? Colors().Text.GREEN : Colors().Text.DARK_60
                      }
                    />
                    <Text
                      style={{
                        fontSize: RFValue(13),
                        color: isFocused
                          ? Colors().Text.GREEN
                          : Colors().Text.DARK_60,
                        marginTop: RFValue(3),
                      }}>
                      {route.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </SafeAreaView>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  );

  return (
    <>
      <Tab.Navigator
        key={locale}
        initialRouteName={'TransactionsList'}
        screenOptions={{swipeEnabled: false}}
        tabBarPosition="bottom"
        tabBar={RenderTabBar}>
        {routes.map(item => (
          <Tab.Screen
            key={locale}
            name={item.name}
            component={item.component}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});
export {BottomTabNavigator};
