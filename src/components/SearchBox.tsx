import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";
import debounce from "just-debounce-it";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Text from "./Text";
import { SearchBoxProps, SearchBoxState } from "./typings/SearchBox";
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

export default class extends React.PureComponent<
  SearchBoxProps,
  SearchBoxState
> {
  debouncedChange: any;

  static defaultProps: Partial<SearchBoxProps> = {
    keyExtractor: item => item.id,
    rowLabelExtractor: item => item.label || item.name,
    renderElement: ({ item }, props) => (
      <View style={styles.row}>
        <Text
          color={colors.gray.darker}
          size={15}
          style={styles.result}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {props.rowLabelExtractor(item)}
        </Text>
      </View>
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      queryValue: ""
    };

    this.debouncedChange = debounce(this.props.onQueryChange, 500);
  }

  private onChange = text => {
    this.setState(
      {
        queryValue: text
      },
      () => this.debouncedChange(text)
    );
  };

  renderNoResultState = query => {
    const {
      noResultsElement = noop,
      bottomSectionPlaceholder = noop
    } = this.props;
    return !query ? bottomSectionPlaceholder() : noResultsElement(query);
  };
  render() {
    const {
      placeholder,
      results,
      onSelect,
      renderElement,
      keyExtractor,
      onClose
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <TouchableWithoutFeedback onPress={onClose}>
            <Icon
              name="back"
              color={colors.gray.darker}
              size={22}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.textInput}
            selectionColor={colors.violet.base}
            onChangeText={this.onChange}
            value={this.state.queryValue}
            placeholder={placeholder}
            placeholderTextColor={colors.gray.light}
            autoFocus
            underlineColorAndroid={colors.white.base}
          />

          {!!this.state.queryValue && (
            <Touchable
              onPress={() =>
                this.setState({
                  queryValue: ""
                })
              }
            >
              <View style={styles.close}>
                <Icon
                  name="close"
                  color={colors.gray.darker}
                  size={8}
                  style={styles.clearIcon}
                />
              </View>
            </Touchable>
          )}
        </View>

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.optionContainer}
        >
          {results.map(result => {
            return (
              <Touchable
                key={keyExtractor(result)}
                onPress={() => onSelect(result)}
              >
                <View>{renderElement({ item: result }, this.props)}</View>
              </Touchable>
            );
          })}

          {!(results && results.length) &&
            this.renderNoResultState(this.state.queryValue)}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
