import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Modal
} from "react-native";
import Input from "./Input";
import Options from "./Options";
import { SelectProps, SelectState } from "./typings/Select";
import Text from "./Text";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";

const styles = StyleSheet.create({
  optionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  optionsWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0
  },

  optionContainer: {
    maxHeight: 220
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1
  },
  icon: {
    height: 62,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 25
  }
});

function noop() {}

export default class Select extends PureComponent<SelectProps, SelectState> {
  state = {
    showOptions: false
  };

  closeOptions = () =>
    this.setState({
      showOptions: false
    });

  onSelect = option => {
    const { onSelect } = this.props;
    onSelect(option);
    this.closeOptions();
  };

  render() {
    const {
      rowRenderElement,
      options,
      selected,
      placeholder,
      required,
      errorMessage,
      keyExtractor,
      title,
      ...rest
    } = this.props;

    // @ts-ignore
    const selectedLabel: string = selected
      ? rowRenderElement(options.find(x => keyExtractor(x) === selected))
      : placeholder;

    // @ts-ignore
    const inputStyle = styles.input;

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
              style={inputStyle}
              fixLabelAtTop
              placeholder="Choose your Option"
              value={selectedLabel}
              onChange={noop}
              required={required}
              errorMessage={errorMessage}
              readOnly
            />
          </View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="fade"
          visible={this.state.showOptions}
          transparent
          onRequestClose={this.closeOptions}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.optionsWrapper}>
              <View
                style={[
                  styles.optionSection,
                  {
                    backgroundColor: colors.gray.lightest,
                    height: 62,
                    paddingLeft: 30
                  }
                ]}
              >
                <Text size={15} color={colors.gray.darker} bold>
                  {title}
                </Text>
                <TouchableWithoutFeedback onPress={this.closeOptions}>
                  <View style={styles.icon}>
                    <Icon
                      name="arrow-down"
                      size={14}
                      color={colors.gray.base}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.optionContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Options
                    options={options}
                    selected={selected}
                    keyExtractor={keyExtractor}
                    onSelect={this.onSelect}
                    rowRenderElement={(item, _i, selected) => (
                      <View style={styles.optionSection}>
                        <Text
                          size={15}
                          color={
                            selected ? colors.violet.base : colors.gray.darker
                          }
                        >
                          {rowRenderElement(item)}
                        </Text>

                        {selected && (
                          <Icon
                            name="check"
                            size={20}
                            color={colors.violet.base}
                          />
                        )}
                      </View>
                    )}
                    {...rest}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
