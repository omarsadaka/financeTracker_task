import React, {useEffect, useState} from 'react';
import {
  Colors,
  RFValue,
  Text,
  View,
  VectorIcons,
  TouchableOpacity,
  SW,
  SH,
  Alert,
} from '../../UI';
import {useLanguage} from '../../lang/useLanguage';
import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
const AppHeader = ({title}: {title: string}) => {
  const {locale, setLocale, t} = useLanguage();

  const changeLanguageFunc = () => {
    Alert({
      title: t('UI.Confirmation'),
      body: t('UI.SureToChangeLanguage'),
      onPress: () => setLocale(),
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          changeLanguageFunc();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Colors().App.BLUE_90,
            marginHorizontal: SW * 0.01,
          }}>
          {locale == 'ar' ? 'EN' : 'AR'}
        </Text>
        <VectorIcons
          icon="FontAwesome"
          name={'language'}
          size={RFValue(22)}
          color={Colors().App.BLUE_90}
        />
      </TouchableOpacity>
    </View>
  );
};
export default AppHeader;
const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: SW * 0.04,
    color: Colors().App.BLUE_90,
    textAlign: 'left',
    marginHorizontal: 8,
    fontWeight: Platform.OS == 'android' ? 'normal' : '800',
  },
  container: {
    width: '100%',
    height: SH * 0.1,
    flexDirection: 'row',
    backgroundColor: Colors().Text.GREEN,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: SW * 0.02,
    alignItems: 'flex-end',
    paddingBottom: SH * 0.015,
  },
});
