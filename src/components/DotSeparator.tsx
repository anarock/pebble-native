import * as React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import { DotSeparatorProps } from "./typings/DotSeparator";
import Icon from "pebble-shared/native/Icon";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 2
  }
});

const DotSeparator: React.FunctionComponent<DotSeparatorProps> = ({
  style = {},
  texts,
  dotColor = colors.gray.light,
  dotSize = 4,
  textProps,
  color = colors.gray.dark
}) => {
  const _texts = texts.filter(Boolean);

  return (
    <View style={[styles.container, style]}>
      <>
        {_texts.map((text, i) => (
          <React.Fragment key={i}>
            <Text color={color} {...textProps}>
              {text}
            </Text>
            {i < _texts.length - 1 && (
              <View style={styles.dotContainer}>
                <Icon size={dotSize} color={dotColor} name="dot" />
              </View>
            )}
          </React.Fragment>
        ))}
      </>
    </View>
  );
};

export default DotSeparator;
