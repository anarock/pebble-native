import * as React from "react";
import { Dimensions, StyleSheet, View, Modal } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import Button from "./Button";
import { ActionModalProps } from "./typings/ActionModal";
import Icon from "@anarock/pebble/native/Icon";
import Touchable from "./shared/Touchable";

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  overlay: {
    flex: 1
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden"
  },
  container: {
    maxHeight: Math.min(472, Dimensions.get("window").height * 0.6),
    paddingHorizontal: 25,
    backgroundColor: colors.white.base
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: colors.white.base
  },
  header: {
    height: 54,
    paddingVertical: 20,
    paddingLeft: 25,
    alignItems: "center",
    flexDirection: "row"
  },
  children: {
    paddingTop: 30,
    paddingBottom: 50
  }
});
const headerTypeToColor = {
  success: {
    light: colors.emerald.lightest,
    dark: colors.emerald.base,
    icon: "radio-check-filled"
  },
  error: {
    light: colors.red.lightest,
    dark: colors.red.base,
    icon: "warning"
  },
  warning: {
    light: colors.yellow.light,
    dark: colors.yellow.base,
    icon: "warning"
  }
};

// @ts-ignore
const ActionModal: React.FunctionComponent<ActionModalProps> = function({
  onClose,
  title,
  children,
  onButtonClick,
  buttonLabel,
  showFooterButton,
  visible,
  header,
  headerType,
  style = {}
}) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <Touchable onPress={onClose}>
          <View style={styles.overlay} />
        </Touchable>

        <View />

        <View style={styles.wrapper}>
          {header && (
            <View
              style={[
                styles.header,
                { backgroundColor: headerTypeToColor[headerType].light }
              ]}
            >
              <Icon
                name={headerTypeToColor[headerType].icon}
                color={headerTypeToColor[headerType].dark}
                size={14}
              />
              <Text color={headerTypeToColor[headerType].dark} size={15}>
                {" " + header}
              </Text>
            </View>
          )}
          <View style={[styles.container, style.container]}>
            {title && (
              <View style={[styles.titleWrapper, style.container]}>
                <Text size={15} color={colors.gray.dark}>
                  {title}
                </Text>
              </View>
            )}
            <View style={[styles.children, style.children]}>{children}</View>
          </View>
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
