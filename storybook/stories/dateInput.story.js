import React from "react";
import { storiesOf } from "@storybook/react-native";
import { DateInput } from "../../src/components";

storiesOf("DateInput", module).add("Default", () => (
  <DateInput
    onChange={() => {}}
    label="Enter Date"
    required
    placeholder="Type Something"
    value={Date.now()}
  />
));
