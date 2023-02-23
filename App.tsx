import * as React from "react";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import Main from "./storybook";

export default props => {
  let [fontsLoaded] = useFonts({
    anarock_medium: require("./assets/fonts/anarock_medium.ttf"),
    anarock_regular: require("./assets/fonts/anarock_regular.ttf"),
    pebble: require("./node_modules/pebble-shared/native/icons/pebble.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Main />;
  }
};
