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
  },
  overlay: {
    flex: 1
  }
});

function noop() {}

export default class Select extends PureComponent<SelectProps, SelectState> {
  static defaultProps: Partial<SelectProps> = {
    valueExtractor: item => item.label || item.name,
    keyExtractor: item => item.id
  };

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
      valueExtractor,
      ...rest
    } = this.props;

    const selectedLabel: string = selected
      ? valueExtractor(options.find(x => selected === keyExtractor(x)))
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
              placeholder={placeholder}
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Options
                    options={options}
                    selected={selected}
                    keyExtractor={keyExtractor}
                    onSelect={this.onSelect}
                    rowRenderElement={rowRenderElement}
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
