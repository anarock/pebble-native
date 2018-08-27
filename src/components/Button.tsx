import * as React from "react";
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import { ButtonProps } from "./typings/Button";

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    minWidth: 150,
    paddingHorizontal: 20,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white.base,
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 1
  }
});

const buttonBackgroundColor = {
  primary: colors.violet.base,
  secondary: colors.gray.lighter,
  link: "transparent"
};

const buttonBackgroundDisabledColor = {
  primary: colors.violet.lighter,
  secondary: colors.gray.lightest,
  link: "transparent"
};

const fontColor = {
  primary: colors.white.base,
  secondary: colors.gray.darker,
  link: colors.violet.base
};

const FooterButton: React.SFC<Partial<ButtonProps>> = ({
  onPress,
  children,
  ...rest
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button onPress={onPress} {...rest}>
        {children}
      </Button>
    </View>
  );
};

class Button extends React.Component<ButtonProps> {
  static FooterButton = FooterButton;

  static defaultProps: Partial<ButtonProps> = {
    type: "primary"
  };

  render() {
    let { children, onPress, type, loading, disabled } = this.props;
    return (
      <TouchableNativeFeedback
        onPress={disabled || loading ? undefined : onPress}
      >
        <View
          style={[
            styles.buttonStyle,
            {
              backgroundColor: disabled
                ? buttonBackgroundDisabledColor[type]
                : buttonBackgroundColor[type]
            }
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white.base} />
          ) : (
            <Text size={15} bold color={fontColor[type]}>
              {children}
            </Text>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default Button;
