import * as React from "react";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import Main from "./storybook";

export default props => {
  let [fontsLoaded] = useFonts({
    anarock_medium: require("./node_modules/pebble-shared/native/icons/pebble.ttf"),
    anarock_regular: require("./node_modules/pebble-shared/native/icons/pebble.ttf"),
    pebble: require("./node_modules/pebble-shared/native/icons/pebble.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Main />;
  }
};
