import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';

const AnimatableView = (props: {
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  animation?: boolean;
  style?: any;
  children?: any;
  isButtonPressed?: number;
}) => {
  const [dontShake, setDontShake] = useState(false);

  useEffect(() => {
    setDontShake(false);
    if (props.isButtonPressed) {
      const timer = setTimeout(() => {
        setDontShake(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [props.isButtonPressed]);

  return (
    <Animatable.View
      {...props}
      animation={props.animation && !dontShake ? 'shake' : ''}
      style={props.style}>
      {props.children}
    </Animatable.View>
  );
};

export {AnimatableView};
