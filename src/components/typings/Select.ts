import { GestureResponderEvent } from "react-native";
import { OptionsProps } from "./Options";

export interface SelectProps<OptionType> extends OptionsProps<OptionType> {
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  valueExtractor: (item: OptionType) => string;
  disabled?: boolean;
  label: (args: {
    value: string;
    props: SelectProps<OptionType>;
    toggle: () => void;
  }) => JSX.Element;
  title?: string;
  onClose?: (e?: GestureResponderEvent) => void;
  showFooterButton?: boolean;
  autoClose?: boolean;
  footer?: JSX.Element;
}

export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: (string | number)[];
}
