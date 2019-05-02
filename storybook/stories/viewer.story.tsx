import { Viewer } from "../../src/recipes";
import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { colors } from "../../src/theme";
import { Text } from "../../src/components";
import Icon from "@anarock/pebble/native/Icon";

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

const owner = {
  id: 11,
  name: "Ritesh Kumar",
  subText: (
    <Text style={{ paddingTop: 3 }} size={13} color={colors.gray.dark}>
      <Text>Site Visit </Text> <Icon name="dot" size={3} />{" "}
      <Text>3 days ago</Text>
    </Text>
  ),
  phone: "+91-7417489999"
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
    phone: "+91-7417489999"
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
    phone: "+91-7417489999"
  }
];

storiesOf("Viewer", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0 }}>
    <Viewer
      onCall={() => {}}
      userId={12}
      owner={owner}
      viewers={viewers}
      agents={options}
      onTranferRequest={() => {}}
      onUnfollowRequest={() => {}}
    />
  </CenterView>
));
