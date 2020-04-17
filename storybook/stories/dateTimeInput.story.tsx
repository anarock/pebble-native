import React from "react";
import { storiesOf } from "@storybook/react-native";
import DateTimeInput from "../../src/components/DateTimeInput";
import CenterView from "./CenterView";
import { useState } from "@storybook/addons";

storiesOf("DateTimeInput", module).add("Default", () => {
  const [value, setValue] = useState(Date.now());
  return (
    <CenterView>
      <DateTimeInput
        onChange={setValue}
        type="datetime"
        label="Enter Time"
        required
        placeholder="Type Something"
        value={value}
      />
    </CenterView>
  );
});
