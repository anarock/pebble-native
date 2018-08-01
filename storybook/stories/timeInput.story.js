import React from "react";
import { storiesOf } from "@storybook/react-native";
import { TimeInput } from "../../src/components";

storiesOf("TimeInput", module).add("Default", () => (
  <TimeInput
    onChange={() => {}}
    label="Enter Time"
    required
    placeholder="Type Something"
    value={Date.now()}
  />
));
