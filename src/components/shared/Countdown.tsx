import * as React from "react";
import Text from "../Text";
import { TextProps } from "../typings/Text";
import { Omit } from "utility-types";

interface CountdownProps extends Omit<TextProps, "children"> {
  beginTime: number; // in seconds
  counter: number; // in seconds
  onFinish: () => void;
}

interface CountdownState {
  timeRemaining: number;
}

export default class Countdown extends React.PureComponent<
  CountdownProps,
  CountdownState
> {
  static defaultProps = {
    beginTime: 30,
    counter: 1000
  };

  state = {
    timeRemaining: this.props.beginTime
  };

  timer: NodeJS.Timeout;

  componentDidMount() {
    this.startCountdown();
  }

  startCountdown() {
    const { counter, onFinish, beginTime } = this.props;

    const startTime = Date.now();
    this.timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const timeRemaining = Math.max(beginTime - elapsedSeconds, 0);
      this.setState({ timeRemaining });
      if (!timeRemaining) {
        clearInterval(this.timer);
        onFinish();
      }
    }, counter);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { timeRemaining } = this.state;
    const { beginTime, counter, onFinish, ...otherProps } = this.props;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
      <Text bold {...otherProps}>{`${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`}</Text>
    );
  }
}
