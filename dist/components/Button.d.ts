import * as React from "react";
import { ButtonProps, DoubleFooterButtonProps } from "./typings/Button";
declare class Button extends React.Component<ButtonProps> {
  static FooterButton: React.FunctionComponent<Partial<ButtonProps>>;
  static DoubleFooterButton: React.FunctionComponent<DoubleFooterButtonProps>;
  static defaultProps: {
    type: string;
  };
  render(): JSX.Element;
}
export default Button;
