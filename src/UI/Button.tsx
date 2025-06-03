import React from 'react';
import {
  RFValue,
  Colors,
  TouchableOpacity,
  ConvertStyleToObject,
  FONT_FAMILY,
} from '../UI';
import {ITouchableOpacity} from '../models/UI/ITouchableOpacity';

export interface IButtonProps extends ITouchableOpacity {
  loading?: boolean;
  type?: 'PRIMARY' | 'SECONDARY';
}

export const Button = (props: IButtonProps) => {
  let {style, textStyle} = props;

  return (
    <TouchableOpacity
      {...props}
      ActivityIndicatorColor={
        props.type == 'SECONDARY' ? Colors().App.BLUE_70 : Colors().App.WHITE
      }
      textStyle={[
        {
          color:
            props.type == 'SECONDARY'
              ? Colors().App.BLUE_70
              : Colors().App.WHITE,
          fontFamily: FONT_FAMILY(),
        },
        ConvertStyleToObject(textStyle),
      ]}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor:
            props.type == 'SECONDARY'
              ? Colors().App.WHITE
              : Colors().Text.GREEN,
          width: '100%',
          borderRadius: RFValue(12),
          minHeight: RFValue(50),
          padding: RFValue(14),
          borderWidth: props.type == 'SECONDARY' ? 1 : 0,
          borderColor: Colors().App.BLUE_90,
        },
        ConvertStyleToObject(style),
      ]}
    />
  );
};
