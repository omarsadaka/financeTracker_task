import { Dimensions } from 'react-native';
function RNRFValue(fontSize: number, deviceHeight: number) {
  const { height, width } = Dimensions.get("window");
  const standardLength = width > height ? width : height;

  const heightPercent = (fontSize * standardLength) / deviceHeight;
  return Math.round(heightPercent);
}

export * from './Alert';
export * from './Button';
export * from './Colors';
export * from './ConvertStyleToObject';
export * from './DropDown';
export * from './FlashMsg';
export * from './Fonts';
export * from './Modal';
export * from './Text';
export * from './TextInput';
export * from './TouchableOpacity';
export * from './VectorIcons';
export * from './View';
export * from './ChangeDirectionStyle';
export * from './AnimatableView';
export * from './ActivityIndicator';
export * from './Image';
export * from './Scalling';







export const RFValue = (x: number) => RNRFValue(x, 812)
export const HEIGHT = () => Dimensions.get('window').height;
export const PADDING_HORIZONTAL = RFValue(10)