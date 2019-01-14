import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import * as React from "react";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
import Text from "./Text";
import { IconTextProps } from "./typings/IconText";

const iconTextStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    alignItems: "center",
    paddingVertical: 4
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});

const IconText: React.FunctionComponent<IconTextProps> = ({
  iconName,
  color,
  backgroundColor,
  label,
  onPress
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={iconTextStyles.container}>
        <CircularButton
          iconColor={color}
          iconBackgroundColor={backgroundColor}
          iconName={iconName}
        />

        <Text color={colors.gray.darker}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default IconText;
