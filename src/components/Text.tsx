import * as React from "react";
import { Text, Animated } from "react-native";
import { TextProps } from "./typings/Text";

const GText: React.SFC<TextProps> = ({
  bold,
  size,
  color,
  style,
  children,
  animated
}) => {
  const Text_ = animated ? Animated.Text : Text;

  return (
    <Text_
      style={[
        {
          fontFamily: bold ? "Graphik-Medium" : "Graphik-Regular",
          fontSize: size,
          color
        },
        style
      ]}
    >
      {children}
    </Text_>
  );
};

export default GText;
