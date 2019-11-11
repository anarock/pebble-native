import { TextProps } from "./Text";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface DotSeparatorProps {
  texts: ReactNode[];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
  style: ViewStyle;
}
