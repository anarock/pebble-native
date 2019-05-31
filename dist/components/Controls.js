import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Text from "./Text";
import Icon from "@anarock/pebble/native/Icon";
import colors from "../theme/colors";
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  itemWrapper: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center"
  },
  defaulLabel: {
    marginLeft: 10
  }
});
const defaultLabelRenderer = item =>
  React.createElement(
    Text,
    { color: colors.gray.darker, size: 15, style: styles.defaulLabel },
    item.label || item.name
  );
const ControlView = ({
  item,
  isSelected,
  type,
  renderLabel = defaultLabelRenderer
}) => {
  const icon = {
    radio: isSelected ? "radio-selected" : "radio",
    checkbox: isSelected ? "checkbox-selected" : "checkbox-unselected"
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Icon, {
      color: isSelected ? colors.violet.base : colors.gray.light,
      size: 18,
      name: icon[type]
    }),
    renderLabel(item)
  );
};
export default class default_1 extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.handlePress = id => {
      const { type, onChange, selected, allowToggle } = this.props;
      if (type === "radio") {
        onChange(
          { selected: allowToggle && selected === id ? undefined : id },
          this.props
        );
      } else {
        if (selected && !Array.isArray(selected)) return;
        // @ts-ignore
        const set = new Set(selected);
        if (set.has(id)) {
          set.delete(id);
        } else {
          set.add(id);
        }
        onChange({ selected: [...set] }, this.props);
      }
    };
    this.isSelected = item => {
      const { keyExtractor, type, selected } = this.props;
      const key = keyExtractor(item);
      return type === "radio"
        ? key === selected
        : Array.isArray(selected) && selected.indexOf(key) >= 0;
    };
  }
  render() {
    const {
      data,
      renderElement,
      keyExtractor,
      style,
      ripple,
      disabled,
      renderLabel
    } = this.props;
    const Touchable =
      ripple && Platform.OS === "android"
        ? TouchableNativeFeedback
        : TouchableWithoutFeedback;
    return React.createElement(
      View,
      { style: [styles.wrapper, style.wrapper] },
      data.map(item => {
        const key = keyExtractor(item);
        const _disabled = Array.isArray(disabled)
          ? disabled.includes(key)
          : disabled;
        return React.createElement(
          Touchable,
          {
            key: key,
            onPress: () => this.handlePress(key),
            disabled: _disabled
          },
          React.createElement(
            View,
            { style: [styles.itemWrapper, style.itemWrapper] },
            renderElement(
              {
                item,
                isSelected: this.isSelected(item),
                renderLabel
              },
              this.props
            )
          )
        );
      })
    );
  }
}
default_1.ControlView = ControlView;
default_1.defaultProps = {
  keyExtractor: item => item.id,
  type: "radio",
  renderElement: ({ item, isSelected, renderLabel }, props) =>
    React.createElement(ControlView, {
      item: item,
      isSelected: isSelected,
      type: props.type,
      renderLabel: renderLabel
    }),
  style: {}
};
//# sourceMappingURL=Controls.js.map
