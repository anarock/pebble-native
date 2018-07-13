// @flow
import * as React from "react";
import { View, StyleSheet, TextInput, Animated } from "react-native";
import type { InputProps, InputState } from "./typings/Input";
import colors from "../theme/colors";
import Text from "./Text";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 68,
    paddingHorizontal: 1,
    marginBottom: 22
  },
  textStyle: {
    marginBottom: 0,
    paddingBottom: 0,
    color: colors.gray.darker,
    fontSize: 15,
    marginTop: 8,
    paddingHorizontal: 0
  },
  highlight: {
    height: 1,
    backgroundColor: colors.gray.light,
    width: "100%"
  },
  placeholder: {
    position: "absolute"
  },
  messageStyle: {
    paddingTop: 12,
    lineHeight: 10
  }
});

function getColor(
  error?: string,
  success?: string,
  isUnderlineColor?: boolean
) {
  let color = colors.gray.dark;
  if (error) {
    color = colors.red.base;
  } else if (success) {
    color = colors.emerald.base;
  } else if (isUnderlineColor) {
    color = colors.violet.base;
  }

  return color;
}

export default class extends React.PureComponent<InputProps, InputState> {
  state: InputState = {
    isFocused: false,
    placeholderTop: new Animated.Value(20)
  };

  static getDerivedStateFromProps (newProps: InputProps) {
    if (newProps.value) {
      return {
        placeholderTop: new Animated.Value(0)
      }
    }

    return null;
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    }, () => {
      Animated.timing(this.state.placeholderTop, {
        toValue: 0,
        duration: 200
      }).start();
    })
  };

  handleBlur = () =>
    this.setState({
      isFocused: false
    }, () => {
      Animated.timing(this.state.placeholderTop, {
        toValue: 20,
        duration: 200
      }).start();
    });

  render() {
    const {
      value,
      placeholder,
      errorMessage,
      successMessage,
      message
    } = this.props;

    const _message = errorMessage || successMessage || message;

    return (
      <View style={styles.wrapper}>
        <Text
          animated
          color={this.state.placeholderTop.interpolate({
            inputRange: [0, 20],
            outputRange: [colors.gray.dark, colors.gray.base]
          })}
          size={this.state.placeholderTop.interpolate({
            inputRange: [0, 20],
            outputRange: [13, 15]
          })}
          style={[
            styles.placeholder,
            {
              top: this.state.placeholderTop
            }
          ]}
        >
          {placeholder}
        </Text>
        <TextInput
          style={styles.textStyle}
          underlineColorAndroid={"transparent"}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoCorrect={false}
          selectionColor={colors.violet.base}
        />
        <View
          style={[
            styles.highlight,
            this.state.isFocused ? {
              height: 2,
              backgroundColor: getColor(errorMessage, successMessage, true),
              marginTop: -1
            } : {}
          ]}
        />

        {_message && (
          <Text
            size={13}
            style={[
              styles.messageStyle,
              { color: getColor(errorMessage, successMessage) }
            ]}
          >
            {_message}
          </Text>
        )}
      </View>
    );
  }
}
