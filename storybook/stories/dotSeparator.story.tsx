import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import DotSeparator from "../../src/components/DotSeparator";

storiesOf("DotSeparator", module).add("Default", () => (
  <CenterView>
    <DotSeparator texts={["Hello", "World"]} />
  </CenterView>
));
