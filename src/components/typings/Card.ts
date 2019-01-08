import * as React from "react";

export interface CardProps {
  title: React.ReactText | JSX.Element;
  rightElement?: React.ReactText | JSX.Element;
  description: React.ReactText | JSX.Element;
  onPress?: () => void;
  style?: any;
}
