import { DatePickerAndroidOpenOptions } from "react-native";
import { Omit } from "utility-types";

export interface DateTimeInputProps
  extends Omit<DatePickerAndroidOpenOptions, "date"> {
  onChange: (timestamp: number) => void;
  value: Date | number;
  type: "date" | "datetime";
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
  placeholder: string;
}
