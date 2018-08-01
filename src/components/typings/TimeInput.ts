interface Args {
	action: any;
	hour?: number;
	minute?: number;
}

export interface TimeInputProps {
	onChange: (value: Args) => void,
	value: Date | number;
	errorMessage?: string;
	required?: boolean;
	disabled?: boolean;
	label: string;
	placeholder: string;
}
