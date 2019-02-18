import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import Login from "../../src/recipes/login";
import { colors } from "../../src/theme";

storiesOf("Login", module).add("Default", () => (
  <CenterView>
    <Login />
  </CenterView>
));
