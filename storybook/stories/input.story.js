import React from "react";
import { storiesOf } from "@storybook/react-native";
import Input from "../../src/components/Input";
import CenterView from "./CenterView";

function noop() {}

storiesOf("Input", module).add("Default", () => (
  <CenterView>
    <Input onChange={noop} placeholder="Type Something" />
  </CenterView>
));
