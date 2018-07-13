import * as React from "react";
import { Text, Animated } from "react-native";

export default function({ bold, size, color, style, children, animated }) {
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
}
