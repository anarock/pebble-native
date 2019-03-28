import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import Icon from "@anarock/pebble/native/Icon";
import { CircularButtonProps } from "./typings/CircularButton";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";

const styles = StyleSheet.create({
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  subLabel: {
    height: 22,
    width: 22,
    position: "absolute",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    right: -6,
    bottom: -6
  }
});

const CircularButton: React.FunctionComponent<CircularButtonProps> = ({
  backgroundColor = colors.white.base,
  iconName,
  color = colors.gray.base,
  style = {},
  label,
  small,
  subBackgroundColor = colors.yellow.base,
  subLabel,
  subLabelColor = colors.white.base
}) => (
  <View
    style={[
      styles.iconWrapper,
      style,
      {
        backgroundColor,
        transform: [
          {
            scale: small ? 0.77 : 1
          }
        ]
      }
    ]}
  >
    {!!iconName && <Icon size={18} name={iconName} color={color} />}

    <ConditionalComponent conditional={label}>
      {_label => (
        <Text size={16} lineHeight={20} bold color={color}>
          {_label}
        </Text>
      )}
    </ConditionalComponent>

    {!!subLabel && (
      <View
        style={[
          styles.subLabel,
          {
            backgroundColor: subBackgroundColor
          }
        ]}
      >
        <Text bold size={10} lineHeight={12} color={subLabelColor}>
          {subLabel}
        </Text>
      </View>
    )}
  </View>
);

export default CircularButton;
