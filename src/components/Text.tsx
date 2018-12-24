import * as React from "react";
import { Text, Animated } from "react-native";
import { TextProps } from "./typings/Text";

const GText: React.SFC<TextProps> = ({
  bold,
  size,
  color,
  style,
  children,
  animated,
  lineHeight,
  ...props
}) => {
  const Text_ = animated ? Animated.Text : Text;

  return (
    <Text_
      style={[
        {
          fontFamily: bold ? "anarock_medium" : "anarock_regular",
          fontSize: size,
          color,
          lineHeight
        },
        style
      ]}
      {...props}
    >
      {children}
    </Text_>
  );
};

export default GText;
