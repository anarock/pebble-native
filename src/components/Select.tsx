import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  InteractionManager
} from "react-native";
import Input from "./Input";
import Options from "./Options";
import { SelectProps, SelectState } from "./typings/Select";
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

export default class Select extends PureComponent<SelectProps, SelectState> {
  static defaultProps: Partial<SelectProps> = {
    valueExtractor: item => item && (item.label || item.name),
    keyExtractor: item => item.id,
    type: "radio",
    autoClose: true
  };

  state = {
    showOptions: false,
    selectedCheckbox:
      this.props.selected && Array.isArray(this.props.selected)
        ? this.props.selected
        : []
  };

  private isRadio = () => this.props.type === "radio";

  private closeOptions = () =>
    this.setState({
      showOptions: false
    });

  private onClose = e => {
    this.closeOptions();
    this.props.onClose(e);
  };

  private onSelect = option => {
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

  private getValue = () => {
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

  public toggle = () =>
    this.setState({
      showOptions: !this.state.showOptions
    });

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

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={
            disabled
              ? undefined
              : () =>
                  this.setState({
                    showOptions: true
                  })
          }
        >
          <View>
            {label ? (
              label({
                value: this.getValue(),
                props: this.props,
                toggle: this.toggle
              })
            ) : (
              <Input
                fixLabelAtTop
                placeholder={placeholder}
                value={this.getValue()}
                onChange={noop}
                required={required}
                errorMessage={errorMessage}
                readOnly
                disabled={disabled}
              />
            )}

            {!disabled && !label && (
              <View style={styles.dropdownIcon}>
                <Icon
                  color={colors.gray.base}
                  name="arrow-drop-down"
                  size={10}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        <ActionModal
          title={placeholder}
          buttonLabel={"Done"}
          onButtonClick={() => {
            this.props.onSelect(this.state.selectedCheckbox);
            this.closeOptions();
          }}
          visible={this.state.showOptions}
          showFooterButton={!this.isRadio() || showFooterButton}
          onClose={this.onClose}
          footer={footer}
        >
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Options
              options={options}
              selected={
                this.isRadio()
                  ? selected
                  : this.state.selectedCheckbox.map(x => keyExtractor(x))
              }
              keyExtractor={keyExtractor}
              type={type}
              {...rest}
              onSelect={this.onSelect}
            />
          </KeyboardAwareScrollView>
        </ActionModal>
      </View>
    );
  }
}
