import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Message from "../../src/components/Message";
import { colors } from "../../src/theme";
import CenterView from "./CenterView";

storiesOf("Message", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0 }}>
    <Message
      backgroundColor={colors.yellow.light}
      title="You are viewer for this lead."
      description="As a viewer you can only do followups with client
and track status changes."
      linkText="Learn More"
    />
  </CenterView>
));
