import * as React from "react";
import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  children: React.ReactChild;
  type?: "primary" | "secondary" | "link";
  loading?: boolean;
  style?: any;
}
