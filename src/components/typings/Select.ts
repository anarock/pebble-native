import {OptionsProps} from "./Options";

export interface SelectProps extends OptionsProps {
  title: string;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
}
