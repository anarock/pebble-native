import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "../../src/components/Button";
import CenterView from "./CenterView";
import { text, boolean, select } from "@storybook/addon-knobs";

storiesOf("Button", module).add("Default", () => (
  <CenterView>
    <Button
      type={select("type", ["primary", "secondary", "link"], "primary")}
      radius={boolean("radius", false)}
      transparent={boolean("transparent", false)}
      onPress={() => {}}
      loading={boolean("loading", false)}
      disabled={boolean("disabled", false)}
    >
      {text("children", "I am a button")}
    </Button>
  </CenterView>
));
