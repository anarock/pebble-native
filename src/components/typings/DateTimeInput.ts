export interface DateTimeInputProps {
  onChange: (timestamp: number) => void;
  value: Date | number;
  type: "date" | "datetime";
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
  placeholder: string;
}
