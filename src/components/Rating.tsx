import * as React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "@anarock/pebble/native/Icon";
import { colors } from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    marginLeft: 3
  },
  icon: {
    paddingHorizontal: 2
  }
});

interface RatingProps {
  max?: number;
  value: number;
  label?: string;
}

// @ts-ignore
const Rating: React.FunctionComponent<RatingProps> = ({
  max = 3,
  value = 0,
  label
}) => {
  return (
    <View style={styles.container}>
      {[...new Array(max)].map((_n, i) => {
        return (
          <Icon
            key={i}
            color={i + 1 <= value ? colors.red.base : colors.gray.light}
            style={styles.icon}
            name="fire"
            size={15}
          />
        );
      })}

      {!!label && (
        <Text style={styles.label} color={colors.gray.darker}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default Rating;
