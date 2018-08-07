import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
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
    maxHeight: Dimensions.get("window").height * 0.6
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
    top: 20,
    right: 10
  },
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: colors.white.base,
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 1
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

  closeOptions = () =>
    this.setState({
      showOptions: false
    });

  onSelect = option => {
    const { onSelect, type } = this.props;

    if (type === "radio") {
      onSelect(option);
      this.closeOptions();
    } else {
      this.setState({
        selectedCheckbox: option
      });
    }
  };

  render() {
    const {
      options,
      selected,
      placeholder,
      required,
      errorMessage,
      keyExtractor,
      title,
      valueExtractor,
      type,
      ...rest
    } = this.props;

    const selectedLabel: string = selected
      ? valueExtractor(options.find(x => selected === keyExtractor(x)))
      : placeholder;

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() =>
            this.setState({
              showOptions: true
            })
          }
        >
          <View>
            <Input
              fixLabelAtTop
              placeholder={placeholder}
              value={selectedLabel}
              onChange={noop}
              required={required}
              errorMessage={errorMessage}
              readOnly
            />
            <View style={styles.dropdownIcon}>
              <Icon color={colors.gray.base} name="arrow-drop-down" />
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
                  {title}
                </Text>
              </View>
              <View style={styles.optionContainer}>
                <ScrollView>
                  <Options
                    options={options}
                    selected={
                      type === "radio"
                        ? selected
                        : this.state.selectedCheckbox.map(x => keyExtractor(x))
                    }
                    keyExtractor={keyExtractor}
                    type={type}
                    {...rest}
                    onSelect={this.onSelect}
                  />
                </ScrollView>
              </View>
              {type === "checkbox" && (
                <View style={styles.buttonWrapper}>
                  <Button
                    onPress={() => {
                      this.onSelect(this.state.selectedCheckbox);
                      this.closeOptions();
                    }}
                  >
                    Done
                  </Button>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
