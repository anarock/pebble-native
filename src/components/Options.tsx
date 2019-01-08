import * as React from "react";
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
    paddingVertical: 20,
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

export default class Options extends React.Component<OptionsProps> {
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
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ flex: 1, paddingRight: 20 }}
            size={15}
            color={colors.gray.darker}
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

  onSelect = ({ selected }) => {
    const { onSelect, options, keyExtractor, type } = this.props;
    onSelect(
      type === "radio"
        ? options.find(option => keyExtractor(option) === selected)
        : options.filter(
            option =>
              Array.isArray(selected) &&
              selected.indexOf(keyExtractor(option)) >= 0
          )
    );
  };

  render() {
    const {
      options,
      selected,
      keyExtractor,
      rowRenderElement,
      width,
      type
    } = this.props;
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
          onChange={this.onSelect}
          data={options}
          keyExtractor={keyExtractor}
          ripple
          selected={selected}
          type={type}
        />
      </View>
    );
  }
}
