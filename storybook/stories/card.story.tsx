import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { Card } from "../../src/components";
import { View } from "react-native";

storiesOf("Card", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0 }}>
    <View style={{ width: "100%" }}>
      <Card
        onPress={() => {}}
        title="Hello World"
        description="Kiki Do you love me?"
        linkText="Result"
      />
    </View>
  </CenterView>
));
