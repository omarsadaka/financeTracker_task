import React from 'react';
import LocalizationContext from './i18n';
import I18n from 'react-native-i18n';
import {useDispatch} from 'react-redux';
import {SaveLang} from '../Redux/store';
import {Alert} from 'react-native';

export const useLanguage = () => {
  let {t, locale, setLocale} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();

  const confirmChangeLanguage = (inputLang?: 'en' | 'ar') => {
    // Alert({
    //   body: t('UI.SureToChangeLanguage'), oneBtn: false, onPress: () => { changeLanguage(inputLang); }
    // })

    Alert.alert(t('UI.Confirmation'), t('UI.SureToChangeLanguage'), [
      {
        text: t('UI.ok'),
        onPress: () => {
          changeLanguage(inputLang);
        },
      },
      {text: t('UI.no')},
    ]);
  };
  const changeLanguage = (inputLang?: 'en' | 'ar') => {
    let lang =
      typeof inputLang == 'string' ? inputLang : locale == 'ar' ? 'en' : 'ar';
    I18n.locale = lang;
    dispatch(SaveLang(lang));
    setLocale(lang);
  };

  return {t, locale, setLocale: changeLanguage, confirmChangeLanguage};
};
