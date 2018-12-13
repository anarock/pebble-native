import * as React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import Input from "./Input";
import { SearchInputProps } from "./typings/SearchInput";
import Icon from "@anarock/pebble/native/Icon";
import colors from "../theme/colors";
import SearchBox from "./SearchBox";

const styles = StyleSheet.create({
  wrapper: {},
  modalHeader: {
    height: 50,
    backgroundColor: colors.white.base,
    paddingHorizontal: 30,
    justifyContent: "center"
  }
});

export default class extends React.PureComponent<SearchInputProps> {
  static defaultProps = {
    renderLabel: ({
      required,
      errorMessage,
      placeholder,
      value,
      disabled
    }: SearchInputProps) => (
      <Input
        required={required}
        errorMessage={errorMessage}
        placeholder={placeholder}
        onChange={() => {}}
        readOnly
        value={value}
        disabled={disabled}
      />
    )
  };

  state = {
    showModal: false
  };

  private closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  private onSelect = item => {
    this.closeModal();
    this.props.onSelect(item);
  };

  render() {
    const {
      disabled,
      results,
      searchBoxPlaceholder,
      keyExtractor,
      onQueryChange,
      renderElement,
      rowLabelExtractor,
      noResultsElement,
      renderLabel,
      defaultState
    } = this.props;
    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          onPress={
            !disabled
              ? () =>
                  this.setState({
                    showModal: true
                  })
              : undefined
          }
        >
          <View>{renderLabel(this.props)}</View>
        </TouchableWithoutFeedback>

        <Modal
          onRequestClose={this.closeModal}
          visible={this.state.showModal}
          animationType="slide"
        >
          <SearchBox
            results={results}
            placeholder={searchBoxPlaceholder}
            onSelect={this.onSelect}
            onQueryChange={onQueryChange}
            keyExtractor={keyExtractor}
            rowLabelExtractor={rowLabelExtractor}
            renderElement={
              renderElement && (args => renderElement(args, this.props))
            }
            noResultsElement={noResultsElement}
            defaultState={defaultState}
            onClose={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}
