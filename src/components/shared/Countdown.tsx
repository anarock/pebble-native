import { Text, StyleProp, TextStyle } from "react-native";
import * as React from "react";

interface CountdownProps {
  timerInterval: number; // in seconds
  counter: number; // in seconds
  style?: StyleProp<TextStyle>;
  onFinish: () => void;
}

interface CountdownState {
  initialTime: number;
  timeRemaining: number;
}

export default class Countdown extends React.PureComponent<
  CountdownProps,
  CountdownState
> {
  static defaultProps = {
    timerInterval: 30,
    counter: 1000
  };

  static getDerivedStateFromProps(
    props: CountdownProps,
    state: CountdownState
  ) {
    if (props.timerInterval !== state.initialTime) {
      return {
        initialTime: props.timerInterval,
        timeRemaining: props.timerInterval
      };
    }
    return null;
  }

  state = {
    initialTime: this.props.timerInterval,
    timeRemaining: this.props.timerInterval
  };

  timer: any; // should be number but TS is giving an error

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
