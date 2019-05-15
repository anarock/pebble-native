import { Viewer } from "../../src/recipes";
import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { colors } from "../../src/theme";
import { Text } from "../../src/components";
import Icon from "@anarock/pebble/native/Icon";

const owner = {
  id: 11,
  name: "Ritesh Kumar",
  subText: (
    <Text style={{ paddingTop: 3 }} size={13} color={colors.gray.dark}>
      <Text>Site Visit </Text>
      <Text
        style={{
          marginTop: -10,
          height: 20,
          flex: 1
        }}
      >
        <Icon name="dot" size={3} />
      </Text>{" "}
      <Text>3 days ago</Text>
    </Text>
  ),
  phone: "+91-7417489999",
  color: "green"
};

const viewers = [
  {
    id: 12,
    name: "Ritesh Kumar",
    subText: (
      <Text style={{ paddingTop: 3 }} size={13} color={colors.gray.dark}>
        <Text>Site Visit </Text> <Icon name="dot" size={3} />{" "}
        <Text>3 days ago</Text>
      </Text>
    ),
    phone: "+91-7417489999",
    color: "green"
  },
  {
    id: 14,
    name: "Ritesh Kumar",
    subText: (
      <Text style={{ paddingTop: 3 }} size={13} color={colors.gray.dark}>
        <Text>Site Visit </Text> <Icon name="dot" size={3} />{" "}
        <Text>3 days ago</Text>
      </Text>
    ),
    phone: "+91-7417489999",
    color: "green"
  }
];

storiesOf("Viewer", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0 }}>
    <Viewer
      onCall={() => {}}
      userId={12}
      owner={owner}
      viewers={viewers}
      onTranferRequest={() => {}}
      onUnfollowRequest={() => {}}
    />
  </CenterView>
));
