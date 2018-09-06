import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Modal
} from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import Button from "./Button";
import { ActionModalProps } from "./typings/ActionModal";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  overlay: {
    flex: 1
  },
  contentWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden"
  },
  contentContainer: {
    maxHeight: Math.min(472, Dimensions.get("window").height * 0.6)
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white.base,
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 25
  }
});

const ActionModal: React.SFC<ActionModalProps> = function({
  onClose,
  title,
  children,
  onButtonClick,
  buttonLabel,
  showFooterButton,
  visible
}) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.wrapper}>
        <TouchableNativeFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableNativeFeedback>

        <View />

        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text size={15} color={colors.gray.dark}>
              {title}
            </Text>
          </View>

          <View style={styles.contentContainer}>{children}</View>

          {showFooterButton && (
            <Button.FooterButton onPress={onButtonClick}>
              {buttonLabel}
            </Button.FooterButton>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ActionModal;
