import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { CircularButton } from "../../src/components";
import { colors } from "../../src/theme";

storiesOf("CircularButton", module)
  .add("Default", () => (
    <CenterView>
      <CircularButton iconName="add" />
    </CenterView>
  ))
  .add("Coloured", () => (
    <CenterView>
      <CircularButton
        iconName="add"
        color={colors.blue.base}
        backgroundColor={colors.blue.light}
      />
    </CenterView>
  ));
