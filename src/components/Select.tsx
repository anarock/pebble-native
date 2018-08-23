import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions
} from "react-native";
import Input from "./Input";
import Options from "./Options";
import { SelectProps, SelectState } from "./typings/Select";
import Text from "./Text";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";
import Button from "./Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },

  optionContainer: {
    maxHeight: Dimensions.get("window").height * 0.4
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
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
    type: "radio"
  };

  state = {
    showOptions: false,
    selectedCheckbox: this.props.selected || []
  };

  private isRadio = () => this.props.type === "radio";

  private closeOptions = () =>
    this.setState({
      showOptions: false
    });

  private onSelect = option => {
    const { onSelect } = this.props;

    if (this.isRadio()) {
      onSelect(option);
      this.closeOptions();
    } else {
      this.setState({
        selectedCheckbox: option
      });
    }
  };

  private getValue = () => {
    const { selected, options, keyExtractor, valueExtractor } = this.props;
    let selectedLabel;
    if (selected) {
      selectedLabel = this.isRadio()
        ? valueExtractor(options.find(x => selected === keyExtractor(x)))
        : valueExtractor(
            options.filter(x => selected.includes(keyExtractor(x)))
          );
    }
    return selectedLabel;
  };

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
            <View style={styles.dropdownIcon}>
              <Icon color={colors.gray.base} name="arrow-drop-down" size={10} />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="fade"
          visible={this.state.showOptions}
          transparent
          onRequestClose={this.closeOptions}
        >
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback onPress={this.closeOptions}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.optionsWrapper}>
              <View
                style={[
                  styles.optionSection,
                  {
                    backgroundColor: colors.white.base,
                    height: 62,
                    paddingLeft: 30
                  }
                ]}
              >
                <Text size={15} color={colors.gray.dark}>
                  {placeholder}
                </Text>
              </View>
              <View style={styles.optionContainer}>
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
              </View>
              {!this.isRadio() && (
                <Button.FooterButton
                  onPress={() => {
                    this.props.onSelect(this.state.selectedCheckbox);
                    this.closeOptions();
                  }}
                >
                  Done
                </Button.FooterButton>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
