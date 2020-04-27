import * as React from "react";

interface ContainerProps {
  children: (args: {
    store: any;
    setState: (args: any) => void;
  }) => React.ReactNode;
  initialState: any;
}

export default class extends React.PureComponent<ContainerProps> {
  state = this.props.initialState;

  private set = (x: any) => {
    this.setState(x);
  };

  render() {
    return this.props.children({
      store: this.state,
      setState: this.set
    });
  }
}
