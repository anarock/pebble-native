import React from "react";
import { storiesOf } from "@storybook/react-native";
import DateTimeInput from "../../src/components/DateTimeInput";
import CenterView from "./CenterView";

storiesOf("DateTimeInput", module).add("Default", () => (
  <CenterView>
    <DateTimeInput
      onChange={alert}
      type="datetime"
      label="Enter Time"
      required
      placeholder="Type Something"
      value={Date.now()}
    />
  </CenterView>
));
