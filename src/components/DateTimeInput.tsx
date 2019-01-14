import * as React from "react";
import {
  TouchableWithoutFeedback,
  TimePickerAndroid,
  View,
  DatePickerAndroid
} from "react-native";
import { DateTimeInputProps } from "./typings/DateTimeInput";
import Input from "./Input";
import { format, setMinutes, setHours, getTime } from "date-fns";

class TimeInput extends React.PureComponent<DateTimeInputProps> {
  private open = async () => {
    const { value, type } = this.props;
    const date = value ? new Date(this.props.value) : new Date();

    const timing = {
      hour: date.getHours(),
      minute: date.getMinutes()
    };

    let selected;
    // @ts-ignore
    const { action, day, month, year } = await DatePickerAndroid.open({
      date
    });

    if (action === DatePickerAndroid.dismissedAction) return;

    selected = new Date(year, month, day);

    if (type === "datetime") {
      // @ts-ignore
      const { action, minute, hour } = await TimePickerAndroid.open({
        ...timing,
        is24Hour: true
      });

      if (action === TimePickerAndroid.dismissedAction) return;
      selected = setHours(selected, hour);
      selected = setMinutes(selected, minute);
    }

    this.props.onChange(getTime(selected));
  };

  render() {
    const {
      errorMessage,
      disabled,
      required,
      label,
      value,
      placeholder,
      type
    } = this.props;

    let _value;
    if (value) {
      _value =
        type === "datetime"
          ? format(value, "ddd, Do MMM YYYY, hh:mm A")
          : format(value, "ddd, Do MMM YYYY");
    }

    return (
      <TouchableWithoutFeedback onPress={this.open}>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TimeInput;
