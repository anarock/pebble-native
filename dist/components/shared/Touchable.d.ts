import * as React from "react";
import {
  TouchableNativeFeedbackProps,
  TouchableHighlightProps
} from "react-native";
declare type TouchableProps =
  | TouchableNativeFeedbackProps
  | TouchableHighlightProps;
declare const Touchable: React.FunctionComponent<TouchableProps>;
export default Touchable;
