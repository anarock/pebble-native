import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Modal,
  SafeAreaView
} from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import Button from "./Button";
import { ActionModalProps, ActionModalStyles } from "./typings/ActionModal";
import Icon from "pebble-shared/native/Icon";
import Touchable from "./shared/Touchable";
import ConditionalComponent from "./shared/ConditionalComponent";

const styles = StyleSheet.create<ActionModalStyles>({
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
    overflow: "hidden",
    backgroundColor: colors.white.base
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
const ActionModal: React.FunctionComponent<ActionModalProps> = function ({
  onClose,
  title,
  children,
  onButtonClick,
  buttonLabel,
  showFooterButton,
  visible,
  header,
  headerType,
  style = {},
  footer,
  ...otherProps
}) {
  const { light, icon, dark } = headerType
    ? headerTypeToColor[headerType]
    : {
        light: undefined,
        icon: undefined,
        dark: undefined
      };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onClose}
      {...otherProps}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.modalContent, style.modalContent]}>
          <Touchable style={[styles.overlay, style.overlay]} onPress={onClose}>
            <View style={[styles.overlay, style.overlay]} />
          </Touchable>

          <View />

          <View style={[styles.wrapper, style.wrapper]}>
            <ConditionalComponent conditional={header}>
              {_header => (
                <View
                  style={[
                    styles.header,
                    { backgroundColor: light },
                    style.header
                  ]}
                >
                  {icon && <Icon name={icon} color={dark} size={14} />}
                  <Text color={dark} size={15}>
                    {" " + _header}
                  </Text>
                </View>
              )}
            </ConditionalComponent>
            <View style={[styles.container, style.container]}>
              {!!title && (
                <View style={[styles.titleWrapper, style.container]}>
                  <Text size={15} color={colors.gray.dark}>
                    {title}
                  </Text>
                </View>
              )}
              <View style={[styles.children, style.children]}>{children}</View>
            </View>
            {showFooterButton &&
              (footer || (
                <Button.FooterButton onPress={onButtonClick}>
                  {buttonLabel}
                </Button.FooterButton>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ActionModal;
