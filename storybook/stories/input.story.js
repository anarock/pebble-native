// @flow

import React from "react";
import { storiesOf } from "@storybook/react-native";
import Input from "../../src/components/Input";

function noop() {}

storiesOf("Input", module).add("Default", () => (
  <Input onChange={noop} placeholder="Type Something" />
));
