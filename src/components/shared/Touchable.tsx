import * as React from "react";
import {
  TouchableNativeFeedbackProps,
  TouchableHighlightProps,
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight
} from "react-native";

type TouchableProps = TouchableNativeFeedbackProps | TouchableHighlightProps;

const Touchable: React.FunctionComponent<TouchableProps> = ({
  children,
  ...props
}) => {
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
    );
  }
  return (
    <TouchableHighlight underlayColor="transparent" {...props}>
      {children}
    </TouchableHighlight>
  );
};

export default Touchable;
