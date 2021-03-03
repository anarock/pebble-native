import * as React from "react";
import { TouchableProps } from "../shared/Touchable";

interface CardBaseProps {
  title: React.ReactNode;
  rightElement?: React.ReactNode;
  description: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

export type CardProps = TouchableProps & CardBaseProps;
