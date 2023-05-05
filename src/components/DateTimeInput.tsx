import * as React from "react";
import { TouchableWithoutFeedback, View, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTimeInputProps } from "./typings/DateTimeInput";
import Input from "./Input";
import { format } from "date-fns";

const valueFormats = {
  date: "ddd, Do MMM YYYY",
  time: "hh:mm A",
  datetime: "ddd, Do MMM YYYY, hh:mm A"
};

type Mode = "date" | "time";

type IosDisplay =
  | "inline" // mode: date
  | "spinner"; // mode: time

interface State {
  tempValue?: Date;
  mode?: Mode;
  visible: boolean;
}

class TimeInput extends React.PureComponent<DateTimeInputProps, State> {
  state: Readonly<State> = {
    tempValue: undefined,
    mode: undefined,
    visible: false
  };

  private open = async () => {
    const { type } = this.props;

    this.setState({
      mode: type === "time" ? "time" : "date",
      visible: true
    });
    return;
  };

  private close = () => {
    this.setState({
      mode: undefined,
      tempValue: undefined,
      visible: false
    });
  };

  private onChange = (date: Date) => {
    this.close();

    const selected = date || this.state.tempValue;
    if (selected) {
      this.props.onChange(selected.getTime());
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
    const { mode, visible } = this.state;

    const display =
      mode &&
      Platform.select<IosDisplay>({
        ios: mode === "date" ? "inline" : "spinner"
      });

    let _value;
    if (value) {
      _value = format(value, valueFormats[type]);
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
          <DateTimePickerModal
            isVisible={visible}
            mode={type}
            display={display}
            date={
              this.state.tempValue || (value ? new Date(value) : new Date())
            }
            minimumDate={minDate ? new Date(minDate) : undefined}
            maximumDate={maxDate ? new Date(maxDate) : undefined}
            onConfirm={this.onChange}
            onCancel={this.close}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TimeInput;
