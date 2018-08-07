import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { OptionsProps } from "./typings/Options";
import colors from "../theme/colors";
import Controls from "./Controls";
import Text from "./Text";
import Icon from "@anarock/pebble/native/Icon";

const styles = StyleSheet.create({
  optionWrapper: {
    backgroundColor: colors.white.base
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 25,
    width: "100%"
  }
});

const controlStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "column"
  },
  itemWrapper: {
    width: "100%"
  }
});

export default class Options extends Component<OptionsProps> {
  static defaultProps: Partial<OptionsProps> = {
    type: "radio",
    keyExtractor: item => item.id,
    rowLabelExtractor: item => item.label || item.name,
    rowRenderElement: ({ item, isSelected }, props) => {
      const icon = {
        radio: isSelected ? "radio-selected" : "radio",
        checkbox: isSelected ? "checkbox-selected" : "checkbox-unselected"
      };

      return (
        <View style={styles.row}>
          <Text
            size={15}
            color={isSelected ? colors.violet.base : colors.gray.darker}
          >
            {props.rowLabelExtractor(item)}
          </Text>

          <Icon
            name={icon[props.type]}
            size={20}
            color={isSelected ? colors.violet.base : colors.gray.light}
          />
        </View>
      );
    }
  };

  render() {
    const { options, keyExtractor, rowRenderElement, width, type } = this.props;
    return (
      <View
        style={[
          styles.optionWrapper,
          {
            width
          }
        ]}
      >
        <Controls
          style={controlStyle}
          renderElement={args => rowRenderElement(args, this.props)}
          onChange={this.props.onSelect}
          data={options}
          keyExtractor={keyExtractor}
          ripple
          type={type}
        />
      </View>
    );
  }
}
