import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "../../src/components/Button";
import CenterView from "./CenterView";

storiesOf("Button", module).add("Default", () => (
  <CenterView>
    <Button onPress={() => {}} loading>
      I am a button
    </Button>
  </CenterView>
));
