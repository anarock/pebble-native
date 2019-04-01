import { OptionsProps } from "./Options";

export interface SelectProps extends OptionsProps {
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  valueExtractor?: (item: any) => string;
  disabled?: boolean;
  label?: (args: {
    value: string;
    props: SelectProps;
    toggle: () => void;
  }) => JSX.Element;
  title?: string;
  showFooterButton?: boolean;
  autoClose?: boolean;
  footer?: JSX.Element;
}

export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: any[];
}
