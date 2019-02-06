import * as React from "react";
import {
  TouchableWithoutFeedbackProps,
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight
} from "react-native";

const Touchable: React.FunctionComponent<TouchableWithoutFeedbackProps> = ({
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
