import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
import CircularButton from "./CircularButton";
const PADDING_HORIZONTAL = 25;
const PADDING_VERTICAL = 20;
const ICON_HEIGHT = 44;
const top = PADDING_VERTICAL + ICON_HEIGHT / 2;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTICAL,
    flexDirection: "row"
  },
  line: {
    width: 0.5,
    position: "absolute",
    backgroundColor: colors.gray.light,
    marginLeft: PADDING_HORIZONTAL + ICON_HEIGHT / 2,
    top: 0,
    bottom: 0
  },
  description: {
    marginTop: 15
  },
  one: {
    flex: 1
  },
  circularButton: { marginRight: 15, marginBottom: 0 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
const Header = ({ title, subText, titleColor, headerRight }) => {
  return React.createElement(
    View,
    { style: styles.row },
    React.createElement(
      View,
      { style: styles.one },
      React.createElement(
        Text,
        { color: titleColor, size: 15, style: { marginBottom: 8 } },
        title
      ),
      React.createElement(
        Text,
        { size: 11, color: colors.gray.dark, lineHeight: 10 },
        subText
      )
    ),
    !!headerRight &&
      React.createElement(
        Text,
        { size: 11, color: colors.gray.dark },
        headerRight
      ),
    React.createElement(View, null)
  );
};
const TimelineEvent = ({
  description,
  backgroundColor = colors.white.base,
  iconName = "dot",
  iconBackgroundColor = "transparent",
  headerRight,
  titleColor,
  title,
  subText,
  onPress,
  position = "between",
  iconColor,
  circularButtonStyle = {},
  descriptionColor = colors.gray.dark
}) => {
  return React.createElement(
    TouchableNativeFeedback,
    { onPress: onPress, disabled: !onPress },
    React.createElement(
      View,
      { style: { position: "relative", backgroundColor } },
      React.createElement(View, {
        style: [
          styles.line,
          {
            ...(position === "start" ? { top } : {})
          },
          {
            ...(position === "end" ? { height: top } : {})
          }
        ]
      }),
      React.createElement(
        View,
        { style: styles.container },
        React.createElement(CircularButton, {
          iconName: iconName,
          backgroundColor: iconBackgroundColor,
          style: [styles.circularButton, circularButtonStyle],
          color: iconColor,
          iconSize: iconName === "dot" ? 10 : undefined
        }),
        React.createElement(
          View,
          { style: styles.one },
          React.createElement(Header, {
            headerRight: headerRight,
            titleColor: titleColor,
            title: title,
            subText: subText
          }),
          !!description &&
            React.createElement(
              ConditionalComponent,
              { conditional: description },
              _desc =>
                React.createElement(
                  Text,
                  {
                    size: 11,
                    color: descriptionColor,
                    lineHeight: 19,
                    style: styles.description
                  },
                  _desc
                )
            )
        )
      )
    )
  );
};
export default TimelineEvent;
//# sourceMappingURL=TimelineEvent.js.map
