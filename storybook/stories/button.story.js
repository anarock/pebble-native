import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "../../src/components/Button";

function noop() {}

storiesOf("Button", module).add("Default", () => (
  <Button onPress={noop} loading>
    I am a button
  </Button>
));
