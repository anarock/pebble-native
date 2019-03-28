import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { ConfirmationPopUp, Text } from "../../src/components";

storiesOf("ConfirmationPopUp", module).add("Default", () => (
  <CenterView>
    <ConfirmationPopUp
      title="Hello world"
      description="Now since you have saved the contact, proceed by clicking on already saved. If you were unable to save the contact."
      confirmButtonText="Transfer"
      rejectButtonText="Transfer & Follow"
      onConfirmPress={() => {}}
      onRejectPress={() => {}}
    >
      {() => <Text>Hello</Text>}
    </ConfirmationPopUp>
  </CenterView>
));
