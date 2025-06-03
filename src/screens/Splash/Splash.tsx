import React, {useEffect, useRef} from 'react';
import {Colors, RFValue, View} from '../../UI';
import {useLanguage} from '../../lang/useLanguage';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import * as Screens from '../index';

const Splash = () => {
  const {t} = useLanguage();
  const Navigation = useNavigation<any>();
  const animation = useRef(new Animated.Value(0)).current;
  const dimension = animation.interpolate({
    inputRange: [0, RFValue(100)],
    outputRange: [RFValue(140), Dimensions.get('window').height + RFValue(400)],
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animation, {
        duration: 800,
        toValue: RFValue(100),
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: Screens.TransactionsList.name,
                },
              ],
            }),
          );
        }, 1000);
      });
    }, 1000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Animated.View
        style={{
          backgroundColor: Colors().Text.GREEN,
          width: dimension,
          height: dimension,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: dimension,
        }}>
        <Animated.Image
          style={{
            transform: [{translateY: animation}],
            height: 50,
            width: 50,
          }}
          source={require('../../assets/images/logo.png')}
        />
      </Animated.View>
    </View>
  );
};

export {Splash};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors().App.WHITE,
  },
});
