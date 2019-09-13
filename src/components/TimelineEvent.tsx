import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
import CircularButton from "./CircularButton";
import { HeaderProps, TimeLineEventProps } from "./typings/TimelineEvent";

const PADDING_HORIZONTAL = 25;
const PADDING_VERTICAL = 20;
const ICON_HEIGHT = 34;

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
  circularButton: { marginRight: 15, marginBottom: 0, marginTop: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  subText,
  titleColor,
  headerRight
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.one}>
        <Text color={titleColor} size={15} style={{ marginBottom: 8 }}>
          {title}
        </Text>
        <Text size={11} color={colors.gray.dark} lineHeight={11}>
          {subText}
        </Text>
      </View>
      {!!headerRight && (
        <Text size={11} color={colors.gray.dark}>
          {headerRight}
        </Text>
      )}
      <View />
    </View>
  );
};

const TimelineEvent: React.FunctionComponent<TimeLineEventProps> = ({
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
  style = {},
  descriptionColor = colors.gray.dark
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={!onPress}>
      <View style={[{ position: "relative", backgroundColor }, style]}>
        <View
          style={[
            styles.line,
            {
              ...(position === "start" ? { top } : {})
            },
            {
              ...(position === "end" ? { height: top } : {})
            }
          ]}
        />
        <View style={styles.container}>
          <CircularButton
            small
            iconName={iconName}
            backgroundColor={iconBackgroundColor}
            style={[
              styles.circularButton,
              circularButtonStyle,
              iconName === "dot" && { marginTop: 0 }
            ]}
            color={iconColor}
            iconSize={iconName === "dot" ? 8 : 18}
          />

          <View style={styles.one}>
            <Header
              headerRight={headerRight}
              titleColor={titleColor}
              title={title}
              subText={subText}
            />

            {!!description && (
              <ConditionalComponent conditional={description}>
                {_desc => (
                  <Text
                    size={11}
                    color={descriptionColor}
                    lineHeight={19}
                    style={styles.description}
                  >
                    {_desc}
                  </Text>
                )}
              </ConditionalComponent>
            )}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default TimelineEvent;
