import React from "react";
import { storiesOf } from "@storybook/react-native";
import Button from "../../src/components/Button";

storiesOf("Button", module).add("Default", () => (
  <Button onPress={() => {}} loading>
    I am a button
  </Button>
));
