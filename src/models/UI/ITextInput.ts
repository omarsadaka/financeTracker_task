import { TextInputProps, TextStyle } from "react-native";

export interface ITextInput extends TextInputProps {
  textInputStyle?: TextStyle | TextStyle[],
  labelStyle?: TextStyle | TextStyle[],
  noDirectionChange?: boolean
  label?: string
  svgSource?: string
  onChangeText?: any
  hasError?: boolean,
  changeDirecton?: boolean
  togglePasswordButton?: boolean
  isButtonPressed?: number
  svgSourceWidth?: number
  svgSourceHeight?: number,
  startIcon?: string,
  isRequired?: boolean
}
