import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ListProps {
  iconName?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  topRightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  subLabel?: string;
  subBackgroundColor?: string;
  subLabelColor?: string;
}
