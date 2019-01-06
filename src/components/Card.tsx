import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import * as React from "react";
import { colors } from "../theme";
import Text from "./Text";
import { CardProps } from "./typings/Card";

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

const Card: React.FunctionComponent<CardProps> = ({
  title,
  linkText,
  description,
  onPress
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={!onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title} size={13} color={colors.gray.dark}>
            {title}
          </Text>
          {typeof description === "string" ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
        </View>
        {!!linkText && (
          <Text color={colors.violet.base} size={13}>
            {linkText}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Card;
