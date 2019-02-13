import * as React from "react";
import { View, StyleSheet, TextInput, Animated, Platform } from "react-native";
import { InputProps, InputState } from "./typings/Input";
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
    color: colors.gray.darker,
    fontSize: 15,
    marginTop: 15,
    paddingHorizontal: 0,
    fontFamily: "anarock_regular",
    ...Platform.select({
      ios: {
        paddingVertical: 5
      }
    })
  },
  highlight: {
    height: 1,
    backgroundColor: colors.gray.light,
    width: "100%"
  },
  placeholder: {
    position: "absolute",
    left: 1
  },
  messageStyle: {
    paddingTop: 12,
    lineHeight: 10
  },
  readOnly: {
    marginTop: 20,
    marginBottom: 4
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

class Input extends React.PureComponent<InputProps, InputState> {
  state: InputState = {
    isFocused: false,
    placeholderMarginTop: new Animated.Value(20)
  };

  static getDerivedStateFromProps(
    newProps: InputProps
  ): Partial<InputState> | null {
    if (newProps.value) {
      return {
        placeholderMarginTop: new Animated.Value(0)
      };
    }

    return null;
  }

  handleFocus = () => {
    this.setState(
      {
        isFocused: true
      },
      () => {
        Animated.timing(this.state.placeholderMarginTop, {
          toValue: 0,
          duration: 200
        }).start();
      }
    );
  };

  handleBlur = () =>
    this.setState(
      {
        isFocused: false
      },
      () => {
        if (!this.props.value)
          Animated.timing(this.state.placeholderMarginTop, {
            toValue: 20,
            duration: 200
          }).start();
      }
    );

  render() {
    const {
      value,
      placeholder,
      errorMessage,
      successMessage,
      message,
      onChange,
      style,
      readOnly,
      required,
      keyboardType,
      disabled
    } = this.props;

    const _message = errorMessage || successMessage || message;
    return (
      <View style={[styles.wrapper, style]}>
        <Text
          animated
          color={this.state.placeholderMarginTop.interpolate({
            inputRange: [0, 20],
            outputRange: [colors.gray.dark, colors.gray.base]
          })}
          size={this.state.placeholderMarginTop.interpolate({
            inputRange: [0, 20],
            outputRange: [13, 15]
          })}
          style={[
            styles.placeholder,
            {
              top: this.state.placeholderMarginTop
            }
          ]}
        >
          {placeholder}{" "}
          {required && !disabled && <Text color={colors.red.base}>*</Text>}
        </Text>
        {readOnly ? (
          <Text
            color={colors.gray.darker}
            size={15}
            style={[styles.readOnly, !value ? { marginBottom: 20 } : undefined]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            <>{value}</>
          </Text>
        ) : (
          <TextInput
            style={[
              styles.textStyle,
              {
                color: disabled ? colors.gray.base : colors.gray.darker
              }
            ]}
            onChangeText={onChange}
            underlineColorAndroid={"transparent"}
            value={value ? value.toString() : undefined}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoCorrect={false}
            selectionColor={colors.violet.base}
            editable={!(readOnly || disabled)}
            keyboardType={keyboardType}
          />
        )}
        <View
          style={[
            styles.highlight,
            this.state.isFocused || _message
              ? {
                  height: 2,
                  backgroundColor: getColor(errorMessage, successMessage, true),
                  marginTop: -2
                }
              : {},
            disabled && { backgroundColor: "transparent" }
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

export default Input;
