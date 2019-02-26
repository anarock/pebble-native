import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { Card, CircularButton, Text } from "../../src/components";
import { View } from "react-native";
import Icon from "@anarock/pebble/native/Icon";
import { colors } from "../../src/theme";

storiesOf("Card", module)
  .add("Default", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <Card
          onPress={() => {}}
          title="Status"
          description="Claimed"
          rightElement="Move to"
        />
      </View>
    </CenterView>
  ))
  .add("Custom", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <Card
          onPress={() => {}}
          title={
            <Text style={{ marginBottom: 4 }}>
              <Icon name="warning" size={11} color={colors.red.base} />{" "}
              <Text color={colors.red.base} size={13}>
                Site visit missed 1d ago.
              </Text>
            </Text>
          }
          style={{
            backgroundColor: colors.red.lightest
          }}
          description="Was this event Done?"
          rightElement={
            <CircularButton
              backgroundColor={colors.red.lighter}
              color={colors.red.base}
              iconName="phone"
              style={{
                marginBottom: 0
              }}
            />
          }
        />
      </View>
    </CenterView>
  ));
