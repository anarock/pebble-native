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
import Icon from "@anarock/pebble/native/Icon";

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
  },
  header: {
    height: 54,
    paddingVertical: 20,
    paddingLeft: 25,
    alignItems: "center",
    flexDirection: "row"
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

const ActionModal: React.SFC<ActionModalProps> = function({
  onClose,
  title,
  children,
  onButtonClick,
  buttonLabel,
  showFooterButton,
  visible,
  header,
  headerType
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
