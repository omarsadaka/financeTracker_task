import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../UI';

export interface IActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle | ViewStyle[];
}

export const ActivityIndicator = (props: IActivityIndicatorProps) => {
  return (
    <View
      style={[
        {justifyContent: 'center', alignItems: 'center', width: '100%'},
        props.style,
      ]}>
      <RNActivityIndicator
        size={props.size || 'small'}
        color={props.color || Colors().App.BLUE_70}
      />
    </View>
  );
};
