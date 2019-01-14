import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import Banner from "../../src/components/Banner";

storiesOf("Banner", module).add("Default", () => (
  <CenterView style={{ paddingHorizontal: 0 }}>
    <Banner
      title="No Booking Info"
      description="Kasturi Maniratnam is recently moved in final negotiations."
      buttonText="NO BOOKING INFO"
      image={require("../../assets/contact.png")}
    />
  </CenterView>
));
