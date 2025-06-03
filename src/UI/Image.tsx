import React, {useState, useEffect, useCallback} from 'react';
import {
  Image as RNImage,
  ImageProps,
  BackHandler,
  Platform,
  useWindowDimensions,
} from 'react-native';
import FastImageComponent from 'react-native-fast-image';
import {
  ChangeDirectionStyle,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ConvertStyleToObject,
  RFValue,
  VectorIcons,
  Colors,
} from '../UI';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SvgUri} from 'react-native-svg';
import {ITouchableOpacity} from '../models/UI/ITouchableOpacity';
import {store} from '../Redux/store';

interface imageProps extends ImageProps, ITouchableOpacity {
  style?: any;
  hideLoader?: boolean;
  noDirectionChange?: boolean;
  showStyle?: boolean;
  openImage?: boolean;
  onLayout?: any;
  source: any;
  imageUrls?: {url: string}[];
  index?: number;
}

const Image = (props: imageProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorIconSize, setErrorIconSize] = useState(0);
  let {width: WIDTH, height: HEIGHT} = useWindowDimensions();

  // const normalisedSource = () => {
  //   const { source } = props;
  //   const NormalisedSource =
  //     source && typeof source.uri === "string"
  //       ? source : null
  //   return props.source && props.source.uri
  //     ? NormalisedSource
  //     : source;
  // };

  const onPressImage = () => {
    if (props.onPress) props.onPress();
    else if (props.openImage) setShowModal(true);
  };

  const onBackPress = useCallback(() => {
    if (showModal) {
      setShowModal(false);
      return true;
    }
    return false;
  }, [showModal]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  // }, [onBackPress]);

  useEffect(() => {
    if (props.imageUrls) {
      FastImage.preload(props.imageUrls.map(item => ({uri: item.url})));
    } else if (props.source.uri && props.source.uri.startsWith('http')) {
      RNImage.prefetch(props.source.uri);
      FastImage.preload([{uri: props.source.uri}]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayout = (x: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    let {width, height} = x.nativeEvent.layout;
    if (props.onLayout) props.onLayout(x);
    setErrorIconSize((width < height ? width : height) / 2);
  };
  const headerHeight: number = RFValue(30);
  const renderLoader = () => <ActivityIndicator size="large" />;
  let FastImage: any = FastImageComponent;
  return (
    <>
      {!!props.openImage && (
        <Modal
          onRequestClose={() => setShowModal(false)}
          visible={showModal}
          transparent={true}>
          <ImageViewer
            loadingRender={renderLoader}
            renderIndicator={() => <View />}
            renderHeader={() => (
              <View
                noDirectionChange
                style={{
                  width: '100%',
                  height: headerHeight,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <VectorIcons
                  noIconDirectionChange
                  style={{zIndex: 2, marginHorizontal: RFValue(20)}}
                  icon="Feather"
                  name="arrow-left-circle"
                  color={'#fff'}
                  size={RFValue(30)}
                  onPress={() => setShowModal(false)}
                />
              </View>
            )}
            index={props.index || 0}
            imageUrls={
              Platform.OS == 'ios'
                ? props.imageUrls
                  ? props.imageUrls.map(item => ({
                      ...item,
                      width: WIDTH,
                      // height: store.getState().App.actualHeight,
                    }))
                  : [{url: props.source?.uri, width: WIDTH, height: HEIGHT}]
                : props.imageUrls || [{url: props.source?.uri}]
            }
            renderImage={
              Platform.OS == 'ios'
                ? inputImage => (
                    <View
                      style={{
                        width: '100%',
                        height: HEIGHT - headerHeight,
                        minHeight: RFValue(100),
                      }}>
                      <ActivityIndicator
                        size="large"
                        style={{
                          zIndex: -1,
                          position: 'absolute',
                          width: RFValue(50),
                          height: RFValue(50),
                        }}
                      />

                      <FastImage
                        {...props}
                        style={{width: '100%', height: '100%'}}
                        source={{
                          uri: inputImage.source.uri,
                          // priority: FastImage.priority.height,
                          // cache: FastImage.cacheControl.cacheOnly
                          priority: FastImage.priority.cacheOnly,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                  )
                : undefined
            }
            enableSwipeDown={true}
            onSwipeDown={() => setShowModal(false)}
          />
        </Modal>
      )}

      {props.source.uri?.endsWith('.svg') ? (
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={ChangeDirectionStyle(props.style)}
          uri={props.source.uri}
        />
      ) : props.source.uri && !props.source.uri.startsWith('data') ? (
        <FastImage
          {...props}
          onLayout={onLayout}
          onError={() => (!props.hideLoader ? setError(true) : null)}
          onLoadEnd={() => (!props.hideLoader ? setLoading(false) : null)}
          style={ChangeDirectionStyle(
            props.style,
            props.noDirectionChange,
            props.showStyle,
          )}
          resizeMode={
            ConvertStyleToObject(props.style).resizeMode
              ? FastImage.resizeMode[
                  ConvertStyleToObject(props.style).resizeMode
                ]
              : FastImage.resizeMode.contain
          }
          source={{
            ...props.source,
            priority: FastImage.priority.cacheOnly,
            cache: FastImage.cacheControl.immutable,
          }}>
          <TouchableOpacity
            disabled={props.disabled}
            activeOpacity={1}
            onPress={props.onPress || props.openImage ? onPressImage : null}
            style={[
              {width: '100%', height: '100%'},
              !props.hideLoader && (loading || error)
                ? {
                    backgroundColor: Colors().Text.LIGHT_GREY,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {},
            ]}>
            {!props.hideLoader && loading ? (
              <ActivityIndicator />
            ) : !props.hideLoader && error ? (
              <VectorIcons
                icon="AntDesign"
                name="exclamationcircle"
                size={errorIconSize}
                color={Colors().App.RED}
              />
            ) : (
              props.children
            )}
          </TouchableOpacity>
        </FastImage>
      ) : (
        <View style={[props.style, props.noDirectionChange, props.showStyle]}>
          <RNImage
            {...props}
            children={null}
            style={{
              resizeMode:
                ConvertStyleToObject(props.style).resizeMode || 'contan',
              width: '100%',
              height: '100%',
            }}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={props.onPress || props.openImage ? onPressImage : null}
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
            }}>
            {props.children}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export {Image};
