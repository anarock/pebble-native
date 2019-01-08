import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../src/theme";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray.lightest,
    paddingHorizontal: "5%"
  }
});

// @ts-ignore
const CenterView: React.FunctionComponent<{ style?: any }> = ({
  children,
  style
}) => <View style={[styles.main, style]}>{children}</View>;

export default CenterView;
