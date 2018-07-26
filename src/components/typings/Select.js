import {OptionsProps} from "./Options";

export type SelectProps = OptionsProps & {
  title: string;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
}
