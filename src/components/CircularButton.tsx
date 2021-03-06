import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import Icon from "pebble-shared/native/Icon";
import { CircularButtonProps } from "./typings/CircularButton";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";

const styles = StyleSheet.create({
  iconWrapper: {
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
  subLabelColor = colors.white.base,
  iconSize = 15,
  ...otherProps
}) => {
  const dimension = small ? 34 : 44;
  return (
    <View
      style={[
        styles.iconWrapper,
        {
          width: dimension,
          height: dimension,
          backgroundColor
        },
        style
      ]}
      {...otherProps}
    >
      {!!iconName && <Icon size={iconSize} name={iconName} color={color} />}

      <ConditionalComponent conditional={label}>
        {_label => (
          <Text size={13} lineHeight={20} bold color={color}>
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
};

export default CircularButton;
