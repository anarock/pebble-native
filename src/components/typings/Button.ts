import * as React from "react";
import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  children: React.ReactText | JSX.Element;
  type?: "primary" | "secondary" | "link";
  loading?: boolean;
  style?: any;
  transparent?: boolean;
  radius?: boolean;
}
