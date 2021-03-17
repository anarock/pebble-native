import * as React from "react";
import { GestureResponderEvent } from "react-native";
import debounce from "just-debounce-it";
import Button from "./Button";
import { ButtonProps } from "./typings/Button";

export interface SingleTapButtonState {
  loading: boolean;
}

export interface SingleTapButtonProps extends Omit<ButtonProps, "onPress"> {
  onPress: (e: GestureResponderEvent) => Promise<any>;
  wait?: number;
}

export default class SingleTapButton extends React.PureComponent<
  SingleTapButtonProps,
  SingleTapButtonState
> {
  state: Readonly<SingleTapButtonState> = {
    loading: false
  };
  private onPress: ButtonProps["onPress"] = debounce(
    (e: GestureResponderEvent) => {
      this.setState({ loading: true });
      // Using function form of finally as want to error out if not returned a Promise
      this.props.onPress(e).finally(() => {
        this.setState({ loading: false });
      });
    },
    this.props.wait || 2000,
    true
  );
  render() {
    return (
      <Button
        {...this.props}
        loading={this.props.loading || this.state.loading}
        onPress={this.onPress}
      />
    );
  }
}
