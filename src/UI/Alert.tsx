import {
  Button,
  Colors,
  FONT_FAMILY,
  RFValue,
  Text,
  View,
  closeModal,
  openModal,
} from '../UI';
import React from 'react';
import I18n from 'react-native-i18n';

interface IAlert {
  title?: string;
  body: string;
  yesTitle?: string;
  noTitle?: string;
  onPress: Function;
  titleStyle?: any;
  oneBtn?: boolean;
}
export const Alert = (props: IAlert) => {
  openModal({
    children: <AlertView {...props} />,
  });
};

const AlertView = (props: IAlert) => {
  return (
    <View
      style={{
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(30),
        borderRadius: RFValue(16),
        width: '80%',
        backgroundColor: Colors().App.GREY,
        elevation: 5,
        shadowOpacity: 0.4,
        shadowOffset: {width: 2, height: 2},
      }}>
      {!!props.title && (
        <Text
          numberOfLines={1}
          style={{
            marginBottom: RFValue(15),
            fontFamily: FONT_FAMILY(),
            textAlign: 'center',
            ...props.titleStyle,
          }}>
          {props.title}
        </Text>
      )}
      <Text numberOfLines={1} style={{textAlign: 'center'}}>
        {props.body}
      </Text>

      <View
        style={{
          marginTop: RFValue(20),
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <Button
          style={{
            width: '47%',
            minHeight: RFValue(40),
            padding: 0,
            borderRadius: RFValue(20),
            marginHorizontal: 1,
          }}
          onPress={() => {
            props.onPress && props.onPress();
            closeModal();
          }}>
          {props.yesTitle || I18n.t('UI.Yes')}
        </Button>
        {!props.oneBtn && (
          <Button
            style={{
              width: '47%',
              minHeight: RFValue(40),
              padding: 0,
              borderRadius: RFValue(20),
              marginHorizontal: 1,
            }}
            onPress={closeModal}>
            {props.noTitle || I18n.t('UI.No')}
          </Button>
        )}
      </View>
    </View>
  );
};
