import React from 'react';
import {Text as RNText, Platform} from 'react-native';
import {useLanguage} from '../lang/useLanguage';
import {ChangeDirectionStyle, Colors, FONT_FAMILY, RFValue} from '../UI';
import {ITextProps} from '../models/UI/IText';

export const Text = (props: ITextProps) => {
  let style = props.style;
  let outputStyle = ChangeDirectionStyle(
    style,
    props.noDirectionChange,
    props.showStyle,
  );

  const {locale} = useLanguage();
  return (
    <RNText
      allowFontScaling={false}
      numberOfLines={
        props.numberOfLines !== undefined ? props.numberOfLines : 1
      }
      {...props}
      onPress={props.disabled ? () => null : props.onPress}
      style={[
        {
          color: Colors().Text.DARK,
          fontSize: outputStyle?.fontSize || RFValue(15),
          textShadowOffset: {width: 0, height: 0},
          // marginVertical: -(outputStyle?.fontSize || RFValue(15)) * (locale === 'ar' ? 0.3 : 0.1),
          fontFamily: FONT_FAMILY(),
        },
        props.noDirectionChange
          ? {}
          : {textAlign: locale === 'ar' ? 'right' : 'left'},
        outputStyle,
        outputStyle && outputStyle.fontWeight === 'bold'
          ? {
              fontFamily: props.boldFontFamily
                ? props.boldFontFamily
                : FONT_FAMILY(),
              fontWeight: Platform.OS == 'android' ? 'normal' : 'bold',
            }
          : {},
      ]}></RNText>
  );
};
