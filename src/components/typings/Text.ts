import * as RN from "react-native";

export interface TextProps extends RN.TextProps {
  bold?: boolean;
  size?: number;
  color?: string;
  style?: RN.StyleProp<RN.TextStyle>;
  animated?: boolean;
  children:
    | JSX.Element
    | string
    | number
    | (string | boolean | JSX.Element | undefined)[];
  lineHeight?: number | string;
}
