import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ViewStyle,
  TextInputProps
} from "react-native";
import { SetRequired } from "type-fest";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    borderWidth: 1.5
  }
});

export interface OTPInputProps extends TextInputProps {
  editable?: boolean;
  containerStyle?: ViewStyle;
  cellStyle?: ViewStyle;
  tintColor?: string;
  offTintColor?: string;
  otpLength?: number;
  value: string;
  cellParentStyle: ViewStyle;
  showCellParentBorderColor: boolean;
}

export default class OTPInput extends React.Component<
  SetRequired<OTPInputProps, keyof typeof OTPInput.defaultProps>
> {
  static defaultProps = {
    otpLength: 6,
    tintColor: "#FB6C6A",
    offTintColor: "#BBBCBE"
  };

  textInput = React.createRef<TextInput>();

  componentDidMount() {
    this.focus();
  }

  // public methods
  public inputRef() {
    return this.textInput.current;
  }

  public focus() {
    if (this.props.editable !== false) {
      this.inputRef()?.focus();
    }
  }

  public blur() {
    this.inputRef()?.blur();
  }

  public isFocused() {
    return this.inputRef()?.isFocused();
  }

  render() {
    const {
      containerStyle,
      cellStyle,
      tintColor,
      offTintColor,
      otpLength,
      value,
      cellParentStyle,
      showCellParentBorderColor,
      ...otherProps
    } = this.props;

    return (
      <View>
        <TextInput
          ref={this.textInput}
          style={{ width: 0, height: 0 }}
          value={value}
          maxLength={otpLength}
          returnKeyType="done"
          keyboardType="numeric"
          {...otherProps}
        />
        <View style={[styles.container, containerStyle]}>
          {Array(otpLength)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[
                  cellParentStyle,
                  showCellParentBorderColor && {
                    borderColor:
                      index === ((value && value.length) || 0)
                        ? tintColor
                        : offTintColor
                  }
                ]}
              >
                <Text
                  style={[
                    styles.cell,
                    cellStyle,
                    {
                      borderColor:
                        index === ((value && value.length) || 0)
                          ? tintColor
                          : offTintColor
                    }
                  ]}
                  onPress={() => this.textInput.current?.focus()}
                >
                  {value && value.length > index ? value[index] : " "}
                </Text>
              </View>
            ))}
        </View>
      </View>
    );
  }
}
