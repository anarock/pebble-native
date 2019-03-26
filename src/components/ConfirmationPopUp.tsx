import React, { PureComponent } from "react";
import ActionModal from "./ActionModal";
import Touchable from "./shared/Touchable";
import Text from "./Text";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import {
  ConfirmationPopUpProps,
  ConfirmationPopUpState
} from "./typings/ConfirmationPopUp";

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

export default class ConfirmationPopUp extends PureComponent<
  ConfirmationPopUpProps,
  ConfirmationPopUpState
> {
  state = {
    isOpen: false
  };

  private toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen
    });

  render():
    | React.ReactElement<any>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const {
      disabled,
      children,
      title,
      description,
      onConfirmPress,
      onRejectPress,
      confirmButtonText,
      rejectButtonText
    } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Touchable onPress={this.toggle} disabled={disabled}>
          {children({
            isOpen
          })}
        </Touchable>
        <ActionModal
          style={actionModalStyle}
          title={title}
          visible={isOpen}
          onClose={this.toggle}
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
      </>
    );
  }
}
