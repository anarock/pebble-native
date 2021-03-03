import * as React from "react";
import { ViewStyle } from "react-native";
import { CircularButtonProps } from "./CircularButton";

export interface HeaderProps {
  title: string;
  subText: React.ReactNode;
  headerRight?: React.ReactNode;
  titleColor?: string;
}

export interface TimeLineEventProps extends HeaderProps {
  style: ViewStyle;
  backgroundColor?: string;
  iconName?: string;
  iconBackgroundColor?: string;
  subText: React.ReactText;
  onPress?: () => void;
  position?: "start" | "between" | "end";
  description?: React.ReactNode;
  iconColor?: string;
  circularButtonStyle?: CircularButtonProps["style"];
  descriptionColor?: string;
}
