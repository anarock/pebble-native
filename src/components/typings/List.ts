import * as React from "react";

export interface ListProps {
  iconName?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: string;
  description: JSX.Element | React.ReactText;
  topRightElement?: JSX.Element | React.ReactText;
  style?: any;
}
