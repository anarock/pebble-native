import { PureComponent } from "react";
import { SelectProps, SelectState } from "./typings/Select";
export default class Select extends PureComponent<SelectProps, SelectState> {
  static defaultProps: Partial<SelectProps>;
  state: {
    showOptions: boolean;
    selectedCheckbox: any[];
  };
  private isRadio;
  private closeOptions;
  private onClose;
  private onSelect;
  private getValue;
  toggle: () => void;
  render(): JSX.Element;
}
