import React from "react";
import { storiesOf } from "@storybook/react-native";
import SearchBox from "../../src/components/SearchBox";
const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

storiesOf("SearchBox", module).add("Default", () => (
  <SearchBox results={options} placeholder="Search" onSelect={() => {}} />
));
