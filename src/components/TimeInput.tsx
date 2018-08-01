import * as React from "react";
import {
	TouchableWithoutFeedback,
	TimePickerAndroid,
	View
} from "react-native";
import { TimeInputProps } from "./typings/TimeInput";
import Input from "./Input";
import format from "date-fns/format";

class TimeInput extends React.PureComponent<TimeInputProps> {
	private open = async () => {
		const date = this.props.value ? new Date(this.props.value) : new Date();

		const timing = {
			hour: date.getHours(),
			minute: date.getMinutes()
		};

		const _value = await TimePickerAndroid.open({
			...timing,
			is24Hour: false
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

		const _value = value ? format(value, "hh:mm A") : placeholder;

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

export default TimeInput;
