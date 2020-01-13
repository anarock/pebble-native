import * as React from "react";
import { TouchableProps } from "../shared/Touchable";

interface CardBaseProps {
  title: React.ReactText | JSX.Element;
  rightElement?: React.ReactText | JSX.Element;
  description: React.ReactText | JSX.Element;
  onPress?: () => void;
  style?: any;
}

export type CardProps = TouchableProps & CardBaseProps;
