import React from "react";
import { storiesOf } from "@storybook/react-native";
import SearchInput from "../../src/components/SearchInput";
const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

function noop() {}

storiesOf("SearchInput", module).add("Default", () => (
  <SearchInput
    results={options}
    placeholder="Search"
    onSelect={noop}
    searchBoxPlaceholder="Type your query"
    value="Hello"
  />
));
