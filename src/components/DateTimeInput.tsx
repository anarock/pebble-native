import * as React from "react";
import { TouchableWithoutFeedback, View, Platform } from "react-native";
import RNDateTimePicker, {
  BaseProps,
  AndroidNativeProps,
  IOSNativeProps
} from "@react-native-community/datetimepicker";

import { DateTimeInputProps } from "./typings/DateTimeInput";
import Input from "./Input";
import { format } from "date-fns";

interface State {
  tempValue: Date;
  mode: AndroidNativeProps["mode"] | IOSNativeProps["mode"];
}

class TimeInput extends React.PureComponent<DateTimeInputProps, State> {
  state: Readonly<State> = {
    tempValue: null,
    mode: null
  };
  private open = async () => {
    if (Platform.OS === "ios") {
      this.setState({
        mode: "datetime"
      });
    } else {
      this.setState({
        mode: "date"
      });
    }
    return;
  };

  private onChange: BaseProps["onChange"] = (_event, date) => {
    if (date) {
      this.props.onChange(date.getTime());
    }
    if (Platform.OS !== "ios" && this.state.mode === "date") {
      this.setState({
        mode: "time",
        tempValue: date
      });
    } else {
      this.setState({
        mode: null,
        tempValue: null
      });
    }
  };

  render() {
    const {
      mode: propsMode,
      errorMessage,
      disabled,
      required,
      label,
      value,
      placeholder,
      type,
      minDate,
      maxDate,
      ...otherProps
    } = this.props;
    const { mode } = this.state;

    let _value;
    if (value) {
      _value =
        type === "datetime"
          ? format(value, "ddd, Do MMM YYYY, hh:mm A")
          : format(value, "ddd, Do MMM YYYY");
    }

    return (
      <TouchableWithoutFeedback onPress={this.open} {...otherProps}>
        <View>
          <Input
            errorMessage={errorMessage}
            disabled={disabled}
            required={required}
            placeholder={label}
            onChange={() => {}}
            readOnly
            value={_value || placeholder}
          />
          {mode && (
            <RNDateTimePicker
              mode={mode}
              // TODO: Aziz accept display for Android
              // display={propsMode}
              value={this.state.tempValue || new Date(value)}
              minimumDate={minDate ? new Date(minDate) : undefined}
              maximumDate={maxDate ? new Date(maxDate) : undefined}
              onChange={this.onChange}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TimeInput;
