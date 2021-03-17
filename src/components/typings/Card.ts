import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableProps } from "../shared/Touchable";

interface CardBaseProps {
  title: React.ReactNode;
  rightElement?: React.ReactNode;
  description: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type CardProps = TouchableProps & CardBaseProps;
