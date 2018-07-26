// @flow

import * as React from "react";
import { View, StyleSheet } from "react-native"
import { storiesOf } from "@storybook/react-native";
import Options from "../../src/components/Options";
import Text from "../../src/components/Text";
import colors from "../../src/theme/colors";
import Icon from "@anarock/pebble/native/Icon"

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const options = new Array(7)
  .fill({
    label: "Lorem ipsum dolor"
  })
  .map((x, i) => ({ ...x, id: i + 1 }));

storiesOf("Options", module).add("basic", () => (
  <Options
    options={options}
    rowRenderElement={(item, i, selected) => (
      <View style={styles.wrapper}>
        <Text
          size={15}
          color={selected ? colors.violet.base : colors.gray.darker}
        >
          {item.label}
        </Text>

        {selected && <Icon name="check" size={20} color={colors.violet.base}/>}
      </View>
    )}
    onSelect={console.log}
    width={300}
    selected={1}
    keyExtractor={x => x.id}
  />
));
