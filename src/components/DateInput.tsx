import * as React from "react";
import {
  TouchableWithoutFeedback,
  DatePickerAndroid,
  View
} from "react-native";
import { DateInputProps } from "./typings/DateInput";
import Input from "./Input";
import format from "date-fns/format";

export default class DateInput extends React.PureComponent<DateInputProps> {
  private open = async () => {
  	const { minDate, maxDate, value } = this.props;

    const _value = await DatePickerAndroid.open({
      date: value && new Date(value),
			minDate: minDate && new Date(minDate),
			maxDate: maxDate && new Date(maxDate)
    });

    this.props.onChange(_value);
  };

  render() {
    const {
      errorMessage,
      disabled,
      required,
      label,
      value,
      placeholder
    } = this.props;

    const _value = value ? format(value, "ddd, Do MMM YYYY") : placeholder;

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
            value={_value}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
