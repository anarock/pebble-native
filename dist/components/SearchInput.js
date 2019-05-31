import * as React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import Input from "./Input";
import SearchBox from "./SearchBox";
export default class default_1 extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showModal: false
    };
    this.closeModal = () => {
      this.setState({
        showModal: false
      });
    };
    this.onSelect = item => {
      this.props.beforeSelect(item).then(() => {
        this.closeModal();
        this.props.onSelect(item);
      });
    };
  }
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
      loading
    } = this.props;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        TouchableWithoutFeedback,
        {
          onPress: !disabled
            ? () =>
                this.setState({
                  showModal: true
                })
            : undefined
        },
        React.createElement(View, null, renderLabel(this.props))
      ),
      React.createElement(
        Modal,
        {
          onRequestClose: this.closeModal,
          visible: this.state.showModal,
          animationType: "slide"
        },
        React.createElement(SearchBox, {
          loading: loading,
          results: results,
          placeholder: searchBoxPlaceholder,
          onSelect: this.onSelect,
          onQueryChange: onQueryChange,
          keyExtractor: keyExtractor,
          rowLabelExtractor: rowLabelExtractor,
          renderElement:
            renderElement && (args => renderElement(args, this.props)),
          noResultsElement: noResultsElement,
          bottomSectionPlaceholder: bottomSectionPlaceholder,
          onClose: this.closeModal
        })
      )
    );
  }
}
default_1.defaultProps = {
  renderLabel: ({ required, errorMessage, placeholder, value, disabled }) =>
    React.createElement(Input, {
      required: required,
      errorMessage: errorMessage,
      placeholder: placeholder,
      onChange: () => {},
      readOnly: true,
      value: value,
      disabled: disabled
    }),
  beforeSelect: () => Promise.resolve()
};
//# sourceMappingURL=SearchInput.js.map
