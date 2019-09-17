import { ReactText } from "react";
import { ViewStyle } from "react-native";

export interface HeaderProps {
  title: string;
  subText: ReactText | JSX.Element;
  headerRight?: ReactText | JSX.Element;
  titleColor?: string;
}

export interface TimeLineEventProps extends HeaderProps {
  style: ViewStyle;
  backgroundColor?: string;
  iconName?: string;
  iconBackgroundColor?: string;
  subText: ReactText;
  onPress?: () => void;
  position?: "start" | "between" | "end";
  description?: ReactText | JSX.Element;
  iconColor?: string;
  circularButtonStyle?: any;
  descriptionColor?: string;
}
