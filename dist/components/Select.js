import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  InteractionManager
} from "react-native";
import Input from "./Input";
import Options from "./Options";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionModal from "./ActionModal";
const styles = StyleSheet.create({
  optionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  optionsWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden"
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1
  },
  overlay: {
    flex: 1
  },
  dropdownIcon: {
    position: "absolute",
    top: 26,
    right: 10
  }
});
function noop() {}
export default class Select extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showOptions: false,
      selectedCheckbox:
        this.props.selected && Array.isArray(this.props.selected)
          ? this.props.selected
          : []
    };
    this.isRadio = () => this.props.type === "radio";
    this.closeOptions = () =>
      this.setState({
        showOptions: false
      });
    this.onClose = e => {
      this.closeOptions();
      this.props.onClose(e);
    };
    this.onSelect = option => {
      const { onSelect, autoClose } = this.props;
      InteractionManager.runAfterInteractions(() => {
        if (this.isRadio()) {
          onSelect(option);
          if (autoClose) this.closeOptions();
        } else {
          this.setState({
            selectedCheckbox: option
          });
        }
      });
    };
    this.getValue = () => {
      const { selected, options, keyExtractor, valueExtractor } = this.props;
      let selectedLabel;
      if (selected) {
        selectedLabel = this.isRadio()
          ? valueExtractor(options.find(x => selected === keyExtractor(x)))
          : valueExtractor(
              options.filter(
                x =>
                  Array.isArray(selected) &&
                  selected.indexOf(keyExtractor(x)) >= 0
              )
            );
      }
      return selectedLabel;
    };
    this.toggle = () =>
      this.setState({
        showOptions: !this.state.showOptions
      });
  }
  render() {
    const {
      options,
      selected,
      placeholder,
      required,
      errorMessage,
      keyExtractor,
      type,
      disabled,
      label,
      footer,
      showFooterButton,
      autoClose,
      ...rest
    } = this.props;
    return React.createElement(
      View,
      null,
      React.createElement(
        TouchableWithoutFeedback,
        {
          onPress: disabled
            ? undefined
            : () =>
                this.setState({
                  showOptions: true
                })
        },
        React.createElement(
          View,
          null,
          label
            ? label({
                value: this.getValue(),
                props: this.props,
                toggle: this.toggle
              })
            : React.createElement(Input, {
                fixLabelAtTop: true,
                placeholder: placeholder,
                value: this.getValue(),
                onChange: noop,
                required: required,
                errorMessage: errorMessage,
                readOnly: true,
                disabled: disabled
              }),
          !disabled &&
            !label &&
            React.createElement(
              View,
              { style: styles.dropdownIcon },
              React.createElement(Icon, {
                color: colors.gray.base,
                name: "arrow-drop-down",
                size: 10
              })
            )
        )
      ),
      React.createElement(
        ActionModal,
        {
          title: placeholder,
          buttonLabel: "Done",
          onButtonClick: () => {
            this.props.onSelect(this.state.selectedCheckbox);
            this.closeOptions();
          },
          visible: this.state.showOptions,
          showFooterButton: !this.isRadio() || showFooterButton,
          onClose: this.onClose,
          footer: footer
        },
        React.createElement(
          KeyboardAwareScrollView,
          { keyboardShouldPersistTaps: "always" },
          React.createElement(
            Options,
            Object.assign(
              {
                options: options,
                selected: this.isRadio()
                  ? selected
                  : this.state.selectedCheckbox.map(x => keyExtractor(x)),
                keyExtractor: keyExtractor,
                type: type
              },
              rest,
              { onSelect: this.onSelect }
            )
          )
        )
      )
    );
  }
}
Select.defaultProps = {
  valueExtractor: item => item && (item.label || item.name),
  keyExtractor: item => item.id,
  type: "radio",
  onClose: noop,
  autoClose: true
};
//# sourceMappingURL=Select.js.map
