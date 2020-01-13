import { StyleProp, TextStyle } from "react-native";
import { InputProps } from "./Input";

export interface TextAreaProps extends InputProps {
  textArea?: boolean;
  textInputStyles?: StyleProp<TextStyle>;
}
