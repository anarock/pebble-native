import { OptionsProps } from "./Options";

export interface SelectProps extends OptionsProps {
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  valueExtractor?: (item: any) => string;
  disabled?: boolean;
  label: (
    args: {
      value: string;
      props: SelectProps;
    }
  ) => JSX.Element;
  title?: string;
}

export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: any[];
}
