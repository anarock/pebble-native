import { OptionsProps } from "./Options";

export interface SelectProps extends OptionsProps {
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  valueExtractor?: (item: any) => string;
  disabled?: boolean;
}

export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: any[];
}
