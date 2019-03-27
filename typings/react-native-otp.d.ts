declare module "react-native-otp" {
  import * as React from "react";
  import * as RN from "react-native";

  export interface OTPInputProps extends RN.TextInputProps {
    value?: string;
    onChange?: Function;
    otpLength?: number;
    tintColor?: string;
    offTintColor?: string;
    containerStyle?: Object;
    cellStyle?: Object;
    defaultValue?: string;
    editable?: boolean;
  }

  export default class OTPInput extends React.Component<OTPInputProps, any> {
    render(): JSX.Element;
  }
}
