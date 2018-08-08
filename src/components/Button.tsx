import * as React from "react";
import { View, TouchableNativeFeedback, StyleSheet } from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import { ButtonProps } from "./typings/Button";

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    minWidth: 150,
    paddingHorizontal: 20,
    backgroundColor: colors.violet.base,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

const Button: React.SFC<ButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.buttonStyle}>
        <Text size={15} bold color={colors.white.base}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;
