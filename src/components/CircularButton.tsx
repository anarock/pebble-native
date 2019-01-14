import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import Icon from "@anarock/pebble/native/Icon";
import { CircularButtonProps } from "./typings/CircularButton";

const styles = StyleSheet.create({
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});

const CircularButton: React.FunctionComponent<CircularButtonProps> = ({
  backgroundColor = colors.white.base,
  iconName,
  iconColor = colors.gray.base,
  style = {}
}) => (
  <View
    style={[
      styles.iconWrapper,
      style,
      {
        backgroundColor
      }
    ]}
  >
    {!!iconName && <Icon size={18} name={iconName} color={iconColor} />}
  </View>
);

export default CircularButton;
