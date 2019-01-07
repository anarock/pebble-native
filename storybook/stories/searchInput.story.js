import React from "react";
import { storiesOf } from "@storybook/react-native";
import SearchInput from "../../src/components/SearchInput";
import CenterView from "./CenterView";

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

storiesOf("SearchInput", module).add("Default", () => (
  <CenterView>
    <SearchInput
      results={options}
      placeholder="Search"
      onSelect={() => {}}
      searchBoxPlaceholder="Type your query"
      value="Hello"
    />
  </CenterView>
));
