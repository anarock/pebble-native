import * as React from "react";
import { SearchInputProps } from "./typings/SearchInput";
export default class extends React.PureComponent<SearchInputProps> {
  static defaultProps: Partial<SearchInputProps>;
  state: {
    showModal: boolean;
  };
  private closeModal;
  private onSelect;
  render(): JSX.Element;
}
