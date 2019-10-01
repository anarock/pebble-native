import { TextProps } from "./Text";
import { ReactChild } from "react";

export interface DotSeparatorProps {
  texts: ReactChild[];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
}
