import { TextProps } from "./Text";

export interface DotSeparatorProps {
  texts: TextProps["children"][];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
}
