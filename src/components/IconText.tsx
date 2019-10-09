import { StyleSheet, View } from "react-native";
import * as React from "react";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
import Text from "./Text";
import { IconTextProps } from "./typings/IconText";
import Touchable from "./shared/Touchable";

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
  onPress,
  ...otherProps
}) => {
  return (
    <Touchable onPress={onPress} disabled={!onPress} {...otherProps}>
      <View
        style={[
          iconTextStyles.container,
          {
            opacity: !onPress ? 0.3 : 1
          }
        ]}
      >
        <CircularButton
          color={color}
          backgroundColor={backgroundColor}
          iconName={iconName}
        />

        <Text color={colors.gray.darker}>{label}</Text>
      </View>
    </Touchable>
  );
};

export default IconText;
