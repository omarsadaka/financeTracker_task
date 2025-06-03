import { Dimensions, StatusBar, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android' && Platform.Version > 26;
const { width: screenWidth, height: screenHeight } = Dimensions.get(
  isAndroid ? 'screen' : 'window',
);

const is_X_Ratio = screenHeight / screenWidth === 812 / 375;

const guidelineBaseWidth = 375;
//const guidelineBaseHeight = is_X_Ratio ? 812 : 667;
const guidelineBaseHeight = 812;

const sWidth = screenWidth;

const sHeight = isAndroid
  ? screenHeight + StatusBar.currentHeight
  : screenHeight;

const hScale = size => (sWidth / guidelineBaseWidth) * size;

const vScale = size => (sHeight / guidelineBaseHeight) * size;

const fScale = (size, factor = 1.25) => size + (hScale(size) - size) * factor;

const screen_width = Dimensions.get('window').width
const screen_height = Dimensions.get('window').height

export { sHeight, sWidth, hScale as HS, vScale as VS, fScale as FS, screen_width as SW, screen_height as SH };
