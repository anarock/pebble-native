import * as React from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView
} from "react-native";
import Input from "./Input";
import { SearchInputProps } from "./typings/SearchInput";
import SearchBox from "./SearchBox";
import { FallbackOptionType, SearchBoxProps } from "./typings/SearchBox";
import { SetRequired } from "type-fest";

export default class SearchInput<OptionType> extends React.PureComponent<
  SetRequired<
    SearchInputProps<OptionType>,
    keyof typeof SearchInput.defaultProps
  >
> {
  static defaultProps = {
    renderLabel: ({
      required,
      errorMessage,
      placeholder,
      value,
      disabled
    }: SearchInputProps<FallbackOptionType>) => (
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

  public openModal = () => {
    this.setState({
      showModal: true
    });
  };

  public closeModal = () => {
    this.setState({
      showModal: false
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private onSelect: SearchBoxProps<OptionType>["onSelect"] = item => {
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
      testIdPrefix,
      extraActionElement,
      openModal
    } = this.props;
    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          testID={`${testIdPrefix}-label`}
          onPress={disabled ? undefined : openModal || this.openModal}
        >
          <View>{renderLabel(this.props)}</View>
        </TouchableWithoutFeedback>

        <Modal
          onRequestClose={this.closeModal}
          visible={this.state.showModal}
          animationType="slide"
        >
          <SafeAreaView style={{ flex: 1 }}>
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
                renderElement
                  ? args => renderElement(args, this.props)
                  : undefined
              }
              noResultsElement={noResultsElement}
              bottomSectionPlaceholder={bottomSectionPlaceholder}
              onClose={this.closeModal}
              extraActionElement={extraActionElement}
            />
          </SafeAreaView>
        </Modal>
      </React.Fragment>
    );
  }
}
