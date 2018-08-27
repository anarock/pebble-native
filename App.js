/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import SearchBox from "./src/components/SearchBox";
import Options from "./src/components/Options";
import Select from "./src/components/Select";

function noop() {}

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

export default class App extends React.Component<Props> {
  render() {
    return (
      <Select
        options={options}
        placeholder="Choose your option"
        onSelect={noop}
        selected={[1]}
        type="checkbox"
        title="Travel Type"
        required
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
