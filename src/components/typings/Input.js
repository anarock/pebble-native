// @flow

import * as RN from "react-native";

export type InputProps = {
  type?: "text" | "date" | "password";
  required?: boolean;
  placeholder: string;
  onChange: (text: string) => void;
  className?: string;
  inputProps?: any;
  fixLabelAtTop?: boolean;
  value?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  message?: string;
  errorMessage?: string;
  successMessage?: string;
  textArea?: boolean;
}

export type InputState = {
  placeholderTop: any;
  isFocused: boolean;
}
