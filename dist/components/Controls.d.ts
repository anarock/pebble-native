import * as React from "react";
import { ControlsProps } from "./typings/Controls";
export default class extends React.PureComponent<ControlsProps> {
  static ControlView: ({
    item,
    isSelected,
    type,
    renderLabel
  }: {
    item: any;
    isSelected: any;
    type: any;
    renderLabel?: (item: any) => JSX.Element;
  }) => JSX.Element;
  static defaultProps: Partial<ControlsProps>;
  private handlePress;
  private isSelected;
  render(): JSX.Element;
}
