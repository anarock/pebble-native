import React from "react";
import { storiesOf } from "@storybook/react-native";
import Input from "../../src/components/Input";
import CenterView from "./CenterView";

storiesOf("Input", module).add("Default", () => (
  <CenterView>
    <Input onChange={() => {}} placeholder="Type Something" />
  </CenterView>
));
