import React from "react";
import { TextProps } from "./Text";

export interface DotSeparatorProps {
  texts: (React.ReactText | JSX.Element | undefined | null | boolean)[];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
}
