import * as React from "react";
import { StyleSheet, View } from "react-native";
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
export default class Options extends React.Component {
  constructor() {
    super(...arguments);
    this.onSelect = ({ selected }) => {
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
  }
  render() {
    const {
      options,
      selected,
      keyExtractor,
      rowRenderElement,
      width,
      type
    } = this.props;
    return React.createElement(
      View,
      {
        style: [
          styles.optionWrapper,
          {
            width
          }
        ]
      },
      React.createElement(Controls, {
        style: controlStyle,
        renderElement: args => rowRenderElement(args, this.props),
        onChange: this.onSelect,
        data: options,
        keyExtractor: keyExtractor,
        ripple: true,
        selected: selected,
        type: type
      })
    );
  }
}
Options.defaultProps = {
  type: "radio",
  keyExtractor: item => item.id,
  rowLabelExtractor: item => item.label || item.name,
  rowRenderElement: ({ item, isSelected }, props) => {
    const icon = {
      radio: isSelected ? "radio-selected" : "radio",
      checkbox: isSelected ? "checkbox-selected" : "checkbox-unselected"
    };
    return React.createElement(
      View,
      { style: styles.row },
      React.createElement(
        Text,
        {
          numberOfLines: 1,
          ellipsizeMode: "tail",
          style: { flex: 1, paddingRight: 20 },
          size: 15,
          color: colors.gray.darker
        },
        props.rowLabelExtractor(item)
      ),
      React.createElement(Icon, {
        name: icon[props.type],
        size: 20,
        color: isSelected ? colors.violet.base : colors.gray.light
      })
    );
  }
};
//# sourceMappingURL=Options.js.map
