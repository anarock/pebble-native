import * as RN from "react-native";

export interface InputProps {
  keyboardType?: RN.KeyboardTypeOptions;
  required?: boolean;
  placeholder: string;
  onChange: (text: string) => void;
  className?: string;
  inputProps?: RN.TextInputProps;
  fixLabelAtTop?: boolean;
  value?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  message?: string;
  errorMessage?: string;
  successMessage?: string;
  style?: RN.StyleProp<RN.ViewStyle>;
  textInputStyles?: RN.StyleProp<RN.TextStyle>;
}

export interface InputState {
  placeholderMarginTop: RN.Animated.Value;
  isFocused: boolean;
}
