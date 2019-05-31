import * as React from "react";
import {
  TouchableWithoutFeedback,
  TimePickerAndroid,
  View,
  DatePickerAndroid
} from "react-native";
import Input from "./Input";
import { format, setMinutes, setHours, getTime } from "date-fns";
class TimeInput extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.open = async () => {
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
  }
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
    return React.createElement(
      TouchableWithoutFeedback,
      { onPress: this.open },
      React.createElement(
        View,
        null,
        React.createElement(Input, {
          errorMessage: errorMessage,
          disabled: disabled,
          required: required,
          placeholder: label,
          onChange: () => {},
          readOnly: true,
          value: _value || placeholder
        })
      )
    );
  }
}
export default TimeInput;
//# sourceMappingURL=DateTimeInput.js.map
