import React from "react";
import ActionModal from "./ActionModal";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { ConfirmationPopUpProps } from "./typings/ConfirmationPopUp";
import Text from "./Text";

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between"
  },
  button: {
    width: "49%"
  }
});

const actionModalStyle = StyleSheet.create({
  children: {
    paddingBottom: 30
  }
});

export default function ConfirmationPopUp({
  title,
  description,
  onConfirmPress,
  onRejectPress,
  confirmButtonText,
  rejectButtonText,
  visible,
  onClose
}: ConfirmationPopUpProps) {
  return (
    <ActionModal
      style={actionModalStyle}
      title={title}
      visible={visible}
      onClose={onClose}
    >
      <>
        <Text size={15} lineHeight={22}>
          {description}
        </Text>

        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            type="secondary"
            onPress={onRejectPress}
          >
            {rejectButtonText}
          </Button>
          <Button style={styles.button} onPress={onConfirmPress}>
            {confirmButtonText}
          </Button>
        </View>
      </>
    </ActionModal>
  );
}
