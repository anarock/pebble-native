interface Args {
	action: any;
	year?: number;
	month?: number;
	day?: number;
}

export interface DateInputProps {
	onChange: (value: Args) => void,
	value: Date | number;
	errorMessage?: string;
	required?: boolean;
	disabled?: boolean;
	label: string;
	placeholder: string;
	minDate?: Date | number;
	maxDate?: Date | number;
}
