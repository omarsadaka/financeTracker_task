import React from 'react';
import {
  Popover as RNPopover,
  PopoverController,
} from 'react-native-modal-popover';
import {ScrollView} from 'react-native';
import {TouchableOpacity, RFValue, Colors} from '../UI';

const DropDown = (props: any) => {
  return (
    <PopoverController>
      {({
        openPopover,
        closePopover,
        popoverVisible,
        setPopoverAnchor,
        popoverAnchorRect,
      }) => (
        <React.Fragment>
          <TouchableOpacity
            disabled={props.disabled}
            ref={setPopoverAnchor}
            textStyle={props.textStyle}
            onPress={() => {
              openPopover();
              !!props.onPress && props.onPress();
            }}
            style={props.style}>
            {props.children}
          </TouchableOpacity>

          <RNPopover
            contentStyle={[
              {
                paddingHorizontal: RFValue(16),
                marginTop: RFValue(40),
                backgroundColor: Colors().App.WHITE,
                borderRadius: RFValue(8),
              },
              props.contentStyle,
            ]}
            arrowStyle={{borderTopColor: 'transparent'}}
            visible={popoverVisible}
            onClose={closePopover}
            fromRect={popoverAnchorRect}
            supportedOrientations={['portrait']}
            placement={props.placement || 'auto'}
            // placement={props.placement || 'bottom'}
          >
            <ScrollView>
              {props.options.map((item: any, i: number) => {
                // console.log(item)
                return (
                  <TouchableOpacity
                    {...item.touchableProps}
                    disabled={item.busy}
                    key={i}
                    textStyle={props.optionTextStyle}
                    onPress={() => {
                      !item.dontClosePopover && closePopover();

                      if (item.onPress)
                        setTimeout(() => {
                          item.onPress(i, item);
                        }, 300);
                    }}
                    style={[
                      {
                        borderBottomWidth:
                          i == props.options.length - 1 ? 0 : 1,
                        borderColor: Colors().App.DARK_60,
                        paddingVertical: RFValue(16),
                      },
                      props.optionStyle,
                    ]}>
                    {props.optionComponent
                      ? props.optionComponent && props.optionComponent(item)
                      : item.label}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </RNPopover>
        </React.Fragment>
      )}
    </PopoverController>
  );
};

export {DropDown};
