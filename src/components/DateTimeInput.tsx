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

interface State {
  visible: boolean;
  tempValue?: Date;
  mode?: Mode;
}

class TimeInput extends React.PureComponent<DateTimeInputProps, State> {
  state: Readonly<State> = {
    visible: false,
    tempValue: undefined,
    mode: undefined
  };

  private open = async () => {
    const { type } = this.props;

    this.setState({
      visible: true,
      mode: type === "time" ? "time" : "date"
    });
    return;
  };

  private close = () => {
    this.setState({ visible: false });
  };

  private onChange = (date: Date) => {
    this.close();

    if (
      this.props.type === "datetime" &&
      this.state.mode === "date" &&
      !!date
    ) {
      this.setState({
        mode: "time",
        tempValue: date,
        visible: true
      });
      return;
    }

    this.setState({
      mode: undefined,
      tempValue: undefined
    });
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
            mode={mode}
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
