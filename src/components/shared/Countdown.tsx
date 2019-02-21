import { StyleSheet, View, Text, StyleProp, TextStyle } from "react-native";
import * as React from "react";

interface CountdownProps {
  time: number; // in seconds
  counter: number; // in seconds
  style?: StyleProp<TextStyle>;
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
    time: 30,
    counter: 1000
  };

  state = {
    timeRemaining: this.props.time
  };

  timer: any; // should be a number but TS is giving an error

  componentDidMount() {
    this.startCountdown();
  }

  startCountdown() {
    const { counter, onFinish } = this.props;

    this.timer = setInterval(() => {
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
      if (this.state.timeRemaining <= 0) {
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
    const { style } = this.props;

    const minutes = Math.floor(timeRemaining / 60) || 0;
    const seconds = timeRemaining - minutes * 60 || 0;

    return (
      <Text style={style}>{`${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`}</Text>
    );
  }
}
