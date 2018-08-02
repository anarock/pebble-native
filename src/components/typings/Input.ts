import * as RN from "react-native";

export interface InputProps {
  keyboardType?: RN.KeyboardTypeAndroid;
  required?: boolean;
  placeholder: string;
  onChange: (text: string) => void;
  className?: string;
  inputProps?: RN.TextInputAndroidProps;
  fixLabelAtTop?: boolean;
  value?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  message?: string;
  errorMessage?: string;
  successMessage?: string;
  textArea?: boolean;
  style?: any;
}

export interface InputState {
  placeholderTop: any;
  isFocused: boolean;
}
