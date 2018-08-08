import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import colors from "../theme/colors";
import Icon from "@anarock/pebble/native/Icon";
import debounce from "just-debounce-it";
import Text from "./Text";
import { SearchBoxProps, SearchBoxState } from "./typings/SearchBox";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.gray.lighter,
    flex: 1
  },
  textInput: {
    backgroundColor: colors.white.base,
    fontSize: 23,
    fontFamily: "Graphik-Medium",
    padding: 30,
    marginBottom: 10
  },
  clearIcon: {
    position: "absolute",
    right: 30,
    top: 38
  },
  row: {
    backgroundColor: colors.white.base,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  }
});

export default class extends React.PureComponent<
  SearchBoxProps,
  SearchBoxState
> {
  debouncedChange: any;

  static defaultProps: Partial<SearchBoxProps> = {
    keyExtractor: item => item.id,
    renderElement: ({ item }) => (
      <View style={styles.row}>
        <Text color={colors.gray.darker} size={15}>
          {item.label || item.name}
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

  render() {
    const {
      placeholder,
      results,
      onSelect,
      renderElement,
      keyExtractor
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <View>
          <TextInput
            style={styles.textInput}
            selectionColor={colors.violet.base}
            onChangeText={this.onChange}
            value={this.state.queryValue}
            placeholder={placeholder}
            placeholderTextColor={colors.gray.light}
          />

          {!!this.state.queryValue && (
            <TouchableNativeFeedback
              onPress={() =>
                this.setState({
                  queryValue: ""
                })
              }
            >
              <View style={styles.clearIcon}>
                <Icon name="close" color={colors.violet.base} size={20} />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>

        <ScrollView>
          {results.map(result => {
            return (
              <TouchableNativeFeedback
                key={keyExtractor(result)}
                onPress={() => onSelect(result)}
              >
                <View>{renderElement({ item: result }, this.props)}</View>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
