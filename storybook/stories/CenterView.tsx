import * as React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingHorizontal: "5%"
  }
});

// @ts-ignore
const CenterView: React.FunctionComponent<{}> = ({ children }) => (
  <View style={styles.main}>{children}</View>
);

export default CenterView;
