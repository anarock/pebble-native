import React from "react";
import { storiesOf } from "@storybook/react-native";
import DateTimeInput from "src/components/DateTimeInput";

storiesOf("DateTimeInput", module).add("Default", () => (
  <DateTimeInput
    onChange={alert}
    type="datetime"
    label="Enter Time"
    required
    placeholder="Type Something"
    value={Date.now()}
  />
));
