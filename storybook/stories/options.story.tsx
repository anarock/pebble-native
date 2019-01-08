import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Options from "../../src/components/Options";
import CenterView from "./CenterView";

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

storiesOf("Options", module).add("basic", () => (
  <CenterView>
    <Options
      options={options}
      onSelect={console.log}
      width={"100%"}
      selected={1}
      keyExtractor={x => x.id}
    />
  </CenterView>
));
