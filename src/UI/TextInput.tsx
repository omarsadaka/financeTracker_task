import {ITextInput} from '../models/UI/ITextInput';
import React, {useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {
  ChangeDirectionStyle,
  Colors,
  ConvertStyleToObject,
  Text,
  RFValue,
  AnimatableView,
  View,
  VectorIcons,
  SW,
} from '../UI';
import {digitsArToEn} from '@persian-tools/persian-tools';
import {useLanguage} from '../lang/useLanguage';

const TextInput = React.forwardRef((props: ITextInput, ref: any) => {
  const [showPassword, togglePassword] = useState(false);
  const {locale} = useLanguage();

  return (
    <>
      {!!props.label && (
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {props.startIcon && (
            <VectorIcons
              icon="AntDesign"
              name={props.startIcon}
              size={RFValue(22)}
              color={Colors().Text.DARK}
            />
          )}
          <Text style={[{flex: 1}, props.labelStyle]}>
            {props.label}{' '}
            {props.isRequired && (
              <Text
                style={{
                  fontSize: SW * 0.03,
                  marginBottom: RFValue(3),
                  marginHorizontal: RFValue(5),
                  color: Colors().App.RED,
                }}>
                {'*'}
              </Text>
            )}
          </Text>
        </View>
      )}

      <AnimatableView
        animation={props.hasError}
        isButtonPressed={props.isButtonPressed}
        style={ChangeDirectionStyle(
          [
            {
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: props.hasError
                ? Colors().App.RED
                : Colors().App.LIGHT_GREY,
              borderRadius: RFValue(12),
              height: RFValue(50),
              marginBottom: RFValue(10),
            },
            ConvertStyleToObject(props.style),
          ],
          props.noDirectionChange,
        )}>
        {!!props.svgSource ? (
          <VectorIcons
            icon="EvilIcons"
            name={props.svgSource}
            size={RFValue(25)}
            color={Colors().Text.DARK}
          />
        ) : (
          <View style={{marginRight: RFValue(20)}} />
        )}

        <RNTextInput
          autoCorrect={false}
          // returnKeyType="none"
          ref={ref}
          secureTextEntry={!!props.togglePasswordButton && !showPassword}
          placeholderTextColor={
            props.hasError ? Colors().Text.RED : Colors().Text.LIGHT_GREY
          }
          {...props}
          onChangeText={text =>
            !!props.onChangeText &&
            props.onChangeText(
              props.keyboardType
                ? digitsArToEn(text || '')?.replace(/\D/g, '')
                : text,
            )
          }
          style={ChangeDirectionStyle(
            [
              {
                color: Colors().App.DARK,
                textAlign: 'left',
                fontSize: RFValue(16),
                flex: 1,
                paddingVertical: 0,
                marginRight: RFValue(20),
              },
              ConvertStyleToObject(props.textInputStyle),
            ],
            props.noDirectionChange,
          )}
        />

        {props.togglePasswordButton && (
          <VectorIcons
            noDirectionChange
            style={[
              locale == 'ar'
                ? {
                    width: '15%',
                    height: '100%',
                    position: 'absolute',
                    alignSelf: 'center',
                    left: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    width: '15%',
                    height: '100%',
                    position: 'absolute',
                    alignSelf: 'center',
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
            ]}
            dontClosekeyboard
            onPress={() => togglePassword(prev => !prev)}
            icon="Feather"
            name={showPassword ? 'eye' : 'eye-off'}
            size={RFValue(20)}
            color={Colors().Text.LIGHT_GREY}
          />
        )}
      </AnimatableView>
    </>
  );
});

export {TextInput};
