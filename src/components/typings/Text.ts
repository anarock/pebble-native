import * as RN from "react-native";

export interface TextProps extends RN.TextProps {
  bold?: boolean;
  size?: RN.Animated.WithAnimatedValue<number>;
  color?: RN.Animated.WithAnimatedValue<string>;
  style?: RN.Animated.WithAnimatedValue<RN.StyleProp<RN.TextStyle>>;
  animated?: boolean;
  lineHeight?: number;
}
