import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";
import debounce from "just-debounce-it";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Text from "./Text";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.gray.lighter,
    flex: 1
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.white.base,
    marginBottom: 1
  },
  textInput: {
    backgroundColor: colors.white.base,
    fontSize: 15,
    flexGrow: 1
  },
  clearIcon: {
    backgroundColor: colors.gray.light,
    borderRadius: 32,
    padding: 5
  },
  icon: {
    marginRight: 10,
    padding: 10
  },
  row: {
    backgroundColor: colors.white.base,
    paddingVertical: 20,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  optionContainer: {
    flexGrow: 1,
    backgroundColor: colors.white.base
  },
  result: {
    lineHeight: 21
  },
  close: {
    padding: 15
  }
});
function noop() {}
export default class default_1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = text => {
      this.setState(
        {
          queryValue: text
        },
        () => this.debouncedChange(text)
      );
    };
    this.renderNoResultState = query => {
      const {
        noResultsElement = noop,
        bottomSectionPlaceholder = noop
      } = this.props;
      return !query ? bottomSectionPlaceholder() : noResultsElement(query);
    };
    this.state = {
      queryValue: ""
    };
    this.debouncedChange = debounce(this.props.onQueryChange, 500);
  }
  render() {
    const {
      placeholder,
      results,
      onSelect,
      renderElement,
      keyExtractor,
      onClose,
      loading
    } = this.props;
    return React.createElement(
      View,
      { style: styles.wrapper },
      React.createElement(
        View,
        { style: styles.textWrapper },
        React.createElement(
          TouchableWithoutFeedback,
          { onPress: onClose },
          React.createElement(Icon, {
            name: "back",
            color: colors.gray.darker,
            size: 22,
            style: styles.icon
          })
        ),
        React.createElement(TextInput, {
          style: styles.textInput,
          selectionColor: colors.violet.base,
          onChangeText: this.onChange,
          value: this.state.queryValue,
          placeholder: placeholder,
          placeholderTextColor: colors.gray.light,
          autoFocus: true,
          underlineColorAndroid: colors.white.base
        }),
        loading &&
          React.createElement(ActivityIndicator, {
            color: colors.violet.base,
            size: "small"
          }),
        !!this.state.queryValue &&
          React.createElement(
            Touchable,
            {
              onPress: () =>
                this.setState({
                  queryValue: ""
                })
            },
            React.createElement(
              View,
              { style: styles.close },
              React.createElement(Icon, {
                name: "close",
                color: colors.gray.darker,
                size: 8,
                style: styles.clearIcon
              })
            )
          )
      ),
      React.createElement(
        KeyboardAwareScrollView,
        {
          keyboardShouldPersistTaps: "always",
          contentContainerStyle: styles.optionContainer
        },
        results.map(result => {
          return React.createElement(
            Touchable,
            { key: keyExtractor(result), onPress: () => onSelect(result) },
            React.createElement(
              View,
              null,
              renderElement({ item: result }, this.props)
            )
          );
        }),
        !(results && results.length) &&
          this.renderNoResultState(this.state.queryValue)
      )
    );
  }
}
default_1.defaultProps = {
  keyExtractor: item => item.id,
  rowLabelExtractor: item => item.label || item.name,
  renderElement: ({ item }, props) =>
    React.createElement(
      View,
      { style: styles.row },
      React.createElement(
        Text,
        {
          color: colors.gray.darker,
          size: 15,
          style: styles.result,
          numberOfLines: 3,
          ellipsizeMode: "tail"
        },
        props.rowLabelExtractor(item)
      )
    )
};
//# sourceMappingURL=SearchBox.js.map
