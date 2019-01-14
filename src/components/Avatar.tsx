import * as React from "react";
import { View, StyleSheet } from "react-native";
import CircularButton from "./CircularButton";
import { colors } from "../theme";

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface AvatarProps {
  backgroundColor?: string;
  label: string;
}

const Avatar: React.FunctionComponent<AvatarProps> = ({
  label,
  backgroundColor
}) => {
  return (
    <View style={[styles.container]}>
      <CircularButton
        small
        color={colors.white.base}
        backgroundColor={backgroundColor}
        label={label}
      />
    </View>
  );
};

export default Avatar;
