import * as React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { TouchableProps } from "../shared/Touchable";

interface ButtonBaseProps {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "primary" | "secondary" | "link";
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  transparent?: boolean;
  radius?: boolean;
}

export type ButtonProps = TouchableProps & ButtonBaseProps;

export interface DoubleFooterButtonProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftButtonType?: ButtonProps["type"];
  rightButtonType?: ButtonProps["type"];
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}
