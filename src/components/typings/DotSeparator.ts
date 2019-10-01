import { TextProps } from "./Text";
import { ReactNode } from "react";

export interface DotSeparatorProps {
  texts: ReactNode[];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
}
