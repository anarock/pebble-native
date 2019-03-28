import * as React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { colors } from "../../src/theme";
import Countdown from "../../src/components/shared/Countdown";

const styles = StyleSheet.create({
  base: { color: colors.violet.base, fontSize: 20, fontWeight: "bold" }
});

storiesOf("Countdown", module).add("basic", () => (
  <CenterView>
    <Countdown
      onFinish={() => alert("Time over!")}
      beginTime={90}
      style={styles.base}
    />
  </CenterView>
));
