import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { Rating } from "../../src/components";

function noop() {}

storiesOf("Rating", module).add("Default", () => (
  <CenterView>
    <Rating value={2} label="Warm" />
  </CenterView>
));
