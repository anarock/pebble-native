import * as React from "react";

export interface ListProps {
  iconName?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: React.ReactText | JSX.Element;
  description: JSX.Element | React.ReactText;
  topRightElement?: JSX.Element | React.ReactText;
  style?: any;
  subLabel?: string;
  subBackgroundColor?: string;
  subLabelColor?: string;
}
