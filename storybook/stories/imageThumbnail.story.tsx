import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { ImageThumbnail } from "../../src/components";

storiesOf("ImageThumbNail", module).add("Default", () => (
  <CenterView>
    <ImageThumbnail
      title="Booking Form"
      subText="25 Aug, 8:30 AM"
      image={require("../../assets/contact.png")}
    />
  </CenterView>
));
