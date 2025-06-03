/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LocalizationContext from '../src/lang/i18n';
import I18n from 'i18n-js';
import FlashMessage from 'react-native-flash-message';
import {FlashMsg, Modal, ModalRef, RFValue} from '../src/UI';
import {RootStack} from '../src/navigation/StackNavigator';
import {useSelector} from 'react-redux';
import {IRootState} from './models';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const App = () => {
  const [locale, setLocale] = React.useState<'ar' | 'en'>();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: any, options?: any) => I18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );
  let {width: WIDTH} = useWindowDimensions();
  const {lang} = useSelector((state: IRootState) => ({
    lang: state.App.lang,
  }));

  useEffect(() => {
    I18n.locale = lang;
    if (lang) {
      setLocale(lang);
    }
  }, [lang]);

  const RenderToast = useCallback(
    (toastOptions: ToastProps) => {
      let backgroundColor =
        toastOptions.type == 'success'
          ? 'rgb(46, 125, 50)'
          : toastOptions.type == 'danger'
          ? 'rgb(211, 47, 47)'
          : toastOptions.type == 'warning'
          ? 'rgb(237, 108, 2)'
          : '#333';
      return (
        <View
          style={{
            backgroundColor,
            borderRadius: 6,
            maxWidth: WIDTH * 0.85,
            padding: RFValue(12),
            paddingVertical: RFValue(16),
          }}>
          <Text
            numberOfLines={0}
            style={{textAlign: 'center', color: Colors().Text.WHITE}}>
            {toastOptions.message}
          </Text>
        </View>
      );
    },
    [WIDTH],
  );

  const renderMessagesComponent = (msg: any) => {
    return <FlashMsg msg={msg} />;
  };

  return (
    <ToastProvider
      renderToast={RenderToast}
      offsetBottom={90}
      placement="bottom"
      duration={4000}
      swipeEnabled={false}
      animationType="slide-in">
      <SafeAreaProvider>
        <LocalizationContext.Provider value={localizationContext}>
          <RootStack />
        </LocalizationContext.Provider>
        <Modal ref={ModalRef} />
        <FlashMessage
          duration={4000}
          animationDuration={500}
          autoHide={true}
          hideOnPress={true}
          position="top"
          MessageComponent={renderMessagesComponent}
        />
      </SafeAreaProvider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
