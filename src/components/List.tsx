import * as React from "react";
import { View, StyleSheet } from "react-native";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
import Text from "./Text";
import { ListProps } from "./typings/List";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: { marginBottom: 0, marginRight: 12, marginTop: 4 },
  titleWrapper: { flexDirection: "row", justifyContent: "space-between" }
});

const List: React.FunctionComponent<ListProps> = ({
  title,
  description,
  iconName,
  iconColor = colors.gray.base,
  iconBackgroundColor,
  style = {},
  topRightElement
}) => {
  return (
    <View style={style}>
      <View style={styles.row}>
        {!!iconName && (
          <CircularButton
            iconName={iconName}
            color={iconColor}
            backgroundColor={iconBackgroundColor}
            style={styles.icon}
          />
        )}
        <View>
          <View style={styles.titleWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              lineHeight={22}
              size={13}
              color={colors.gray.dark}
            >
              {title}
            </Text>
            {topRightElement}
          </View>
          <Text color={colors.gray.darker} lineHeight={22} size={13}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default List;
