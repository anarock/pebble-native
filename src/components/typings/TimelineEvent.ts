import React from "react";

export interface HeaderProps {
  title: string;
  subText: React.ReactText | JSX.Element;
  headerRight?: React.ReactText | JSX.Element;
  titleColor?: string;
}

export interface TimeLineEventProps extends HeaderProps {
  backgroundColor?: string;
  iconName?: string;
  iconBackgroundColor?: string;
  subText: string;
  onPress?: () => void;
  position?: "start" | "between" | "end";
  description?: React.ReactText | JSX.Element;
  iconColor?: string;
  circularButtonStyle?: any;
  descriptionColor?: string;
}
