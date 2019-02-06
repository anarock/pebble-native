import { StyleSheet, View } from "react-native";
import * as React from "react";
import { colors } from "../theme";
import Text from "./Text";
import { CardProps } from "./typings/Card";
import ConditionalComponent from "./shared/ConditionalComponent";
import Touchable from "./shared/Touchable";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: colors.white.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  title: { marginBottom: 6 }
});

// @ts-ignore
const Card: React.FunctionComponent<CardProps> = ({
  title,
  rightElement,
  description,
  onPress,
  style = {}
}) => {
  return (
    <Touchable onPress={onPress} disabled={!onPress}>
      <View style={[styles.container, style]}>
        <View>
          <ConditionalComponent conditional={title}>
            {_title => (
              <Text style={styles.title} size={13} color={colors.gray.dark}>
                {_title}
              </Text>
            )}
          </ConditionalComponent>

          <ConditionalComponent conditional={description}>
            {_description => <Text>{_description}</Text>}
          </ConditionalComponent>
        </View>

        <ConditionalComponent conditional={rightElement}>
          {_rightElement => (
            <Text color={colors.violet.base} size={13}>
              {_rightElement}
            </Text>
          )}
        </ConditionalComponent>
      </View>
    </Touchable>
  );
};

export default Card;
