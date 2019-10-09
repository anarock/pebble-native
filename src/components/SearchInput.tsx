import * as React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import Input from "./Input";
import { SearchInputProps } from "./typings/SearchInput";
import SearchBox from "./SearchBox";
import createTestProps from "../utils/createTestProps";

export default class extends React.PureComponent<SearchInputProps> {
  static defaultProps: Partial<SearchInputProps> = {
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
    ),
    beforeSelect: () => Promise.resolve(),
    testIdPrefix: "search-input"
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
    this.props.beforeSelect(item).then(() => {
      this.closeModal();
      this.props.onSelect(item);
    });
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
      bottomSectionPlaceholder,
      loading,
      testIdPrefix
    } = this.props;
    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          {...createTestProps(`${testIdPrefix}-label`)}
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
            testIdPrefix={testIdPrefix}
            loading={loading}
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
            bottomSectionPlaceholder={bottomSectionPlaceholder}
            onClose={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}
