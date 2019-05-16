import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
import CircularButton from "./CircularButton";
import { HeaderProps, TimeLineEventProps } from "./typings/TimelineEvent";

const PADDING_HORIZONTAL = 25;
const PADDING_VERTICAL = 20;
const ICON_HEIGHT = 44;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: PADDING_VERTICAL,
    flexDirection: "row"
  },
  line: {
    width: 2,
    position: "absolute",
    backgroundColor: colors.gray.light,
    marginLeft: PADDING_HORIZONTAL + ICON_HEIGHT / 2 - 1,
    top: 0,
    bottom: 0
  },
  description: {
    marginTop: 15
  },
  one: {
    flex: 1
  },
  circularButton: { marginRight: 15, marginBottom: 0 }
});

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  subText,
  titleColor,
  headerRight
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <View style={styles.one}>
        <Text color={titleColor} size={15} style={{ marginBottom: 8 }}>
          {title}
        </Text>
        <Text size={11} color={colors.gray.dark} lineHeight={10}>
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

const top = PADDING_VERTICAL + ICON_HEIGHT / 2 - 1;

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
  descriptionColor = colors.gray.dark
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={!onPress}>
      <View style={{ position: "relative", backgroundColor }}>
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
        <View style={[styles.container]}>
          <CircularButton
            iconName={iconName}
            backgroundColor={iconBackgroundColor}
            style={[styles.circularButton, circularButtonStyle]}
            color={iconColor}
            iconSize={iconName === "dot" ? 10 : undefined}
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
