import React from "react";
import { storiesOf } from "@storybook/react-native";
import SearchBox from "../../src/components/SearchBox";
import CenterView from "./CenterView";

function noop() {}

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor ;lklk ;l;lk;k;lkl;k jhgjhgjhg jhghgjhg"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

storiesOf("SearchBox", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0, paddingTop: 50 }}>
    <SearchBox
      results={options}
      placeholder="Search"
      onQueryChange={noop}
      onSelect={noop}
      loading
    />
  </CenterView>
));
