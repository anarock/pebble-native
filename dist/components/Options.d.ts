import * as React from "react";
import { OptionsProps } from "./typings/Options";
export default class Options extends React.Component<OptionsProps> {
  static defaultProps: Partial<OptionsProps>;
  onSelect: ({ selected }: { selected: any }) => void;
  render(): JSX.Element;
}
