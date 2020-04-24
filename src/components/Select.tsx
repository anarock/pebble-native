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
import Icon from "pebble-shared/native/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionModal from "./ActionModal";
import { ActionModalProps } from "./typings/ActionModal";

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

interface FallbackOptionType {
  label: string;
  name: string;
  id: string | number;
}

export default class Select<OptionType> extends PureComponent<
  SelectProps<OptionType>,
  SelectState
> {
  static defaultProps = {
    valueExtractor: (item: FallbackOptionType) =>
      item && (item.label || item.name),
    keyExtractor: (item: FallbackOptionType) => item.id,
    type: "radio",
    onClose: noop,
    autoClose: true,
    testIdPrefix: "select"
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

  private onClose: ActionModalProps["onClose"] = e => {
    this.closeOptions();
    this.props.onClose && this.props.onClose(e);
  };

  private onSelect = (option: OptionType[]) => {
    const { keyExtractor, onSelect, autoClose } = this.props;

    InteractionManager.runAfterInteractions(() => {
      if (this.isRadio()) {
        onSelect(option);
        if (autoClose) this.closeOptions();
      } else {
        this.setState({
          selectedCheckbox: option.map(keyExtractor)
        });
      }
    });
  };

  private getValue = () => {
    const { selected, options, keyExtractor, valueExtractor } = this.props;
    let selectedLabel;
    if (selected) {
      if (this.isRadio()) {
        const selectedOption = options.find(x => selected === keyExtractor(x));
        selectedLabel = selected ? valueExtractor(selectedOption) : "";
      } else {
        selectedLabel = valueExtractor(
          options.filter(
            x =>
              Array.isArray(selected) && selected.indexOf(keyExtractor(x)) >= 0
          )
        );
      }
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
      testIdPrefix,
      ...rest
    } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback
          testID={`${testIdPrefix}-label`}
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
                value: this.getValue() || "",
                props: this.props,
                toggle: this.toggle
              })
            ) : (
              <Input
                fixLabelAtTop
                placeholder={placeholder || ""}
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
            this.props.onSelect(
              this.props.options.filter(option =>
                this.state.selectedCheckbox.includes(keyExtractor(option))
              )
            );
            this.closeOptions();
          }}
          visible={this.state.showOptions}
          showFooterButton={!this.isRadio() || showFooterButton}
          onClose={this.onClose}
          footer={footer}
        >
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            testID={`${testIdPrefix}-modal`}
          >
            <Options
              testIdPrefix={testIdPrefix}
              options={options}
              selected={this.isRadio() ? selected : this.state.selectedCheckbox}
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
