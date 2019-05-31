import * as React from "react";
import { SearchBoxProps, SearchBoxState } from "./typings/SearchBox";
export default class extends React.PureComponent<
  SearchBoxProps,
  SearchBoxState
> {
  debouncedChange: any;
  static defaultProps: Partial<SearchBoxProps>;
  constructor(props: any);
  private onChange;
  renderNoResultState: (query: any) => any;
  render(): JSX.Element;
}
