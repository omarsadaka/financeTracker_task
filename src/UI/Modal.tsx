import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ChangeDirectionStyle, Colors, ConvertStyleToObject, SH} from '../UI';
// import RNModal from 'react-native-modal';
import {Modal as RNModal} from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';

interface ModalProps {
  isVisible?: boolean;
  noDirectionChange?: boolean;
  noSwipeDirection?: boolean;
  children?: any;
  noKeyboardBehavior?: boolean;
  backdropColor?: string;
  onPressModal?: () => void;
  modalStyle?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  showStyle?: boolean;
  transparent?: boolean;
  animationType?: string;
  onRequestClose?: () => void;
}

export const ModalRef = React.createRef<any>();

export const openModal = (_props: ModalProps) => {
  ModalRef?.current?.open(_props);
};

export const closeModal = () => {
  ModalRef.current.closeModal();
};

export const Modal = forwardRef((_, ref) => {
  const [props, setProps] = useState<ModalProps>({});
  const [showModal, setShowModal] = useState(!!props.isVisible);
  let {width: WIDTH} = useWindowDimensions();

  const handleModal = () => {
    setShowModal(val => !val);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  const openModalFunc = () => {
    setShowModal(true);
  };

  useImperativeHandle(ref, () => ({
    handleModal,
    closeModal: closeModalFunc,
    openModal: openModalFunc,
    open: (_props: ModalProps) => {
      setProps(_props);
      setShowModal(true);
    },
  }));

  return (
    <RNModal
      transparent={true}
      animationType="fade"
      visible={showModal}
      onRequestClose={closeModalFunc}
      // {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: 'transparent',
          alignSelf: 'center',
          margin: 0,
          backgroundColor: Colors().App.GREY,
        },
        ChangeDirectionStyle(
          props.modalStyle,
          props.noDirectionChange,
          props.showStyle,
        ),
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        enabled={!props.noKeyboardBehavior}
        contentContainerStyle={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: WIDTH,
          },
          props.containerStyle,
        ]}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: WIDTH,
            top: SH * 0.35,
          },
          ConvertStyleToObject(props.containerStyle),
        ]}>
        {props.noSwipeDirection ? (
          props.children
        ) : (
          <TouchableWithoutFeedback
            style={{
              width: '100%',
            }}
            onPress={() => {
              Keyboard.dismiss();
              !!props.onPressModal && props.onPressModal();
            }}>
            {props.children}
          </TouchableWithoutFeedback>
        )}
      </KeyboardAvoidingView>
    </RNModal>
  );
});
