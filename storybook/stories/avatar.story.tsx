import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { Avatar } from "../../src/components";
import { colors } from "../../src/theme";

storiesOf("Avatar", module).add("Default", () => (
  <CenterView>
    <Avatar label="RK" backgroundColor={colors.green.base} />
  </CenterView>
));
