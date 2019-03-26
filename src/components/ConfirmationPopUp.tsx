import React, { PureComponent } from "react";
import ActionModal from "./ActionModal";
import Touchable from "./shared/Touchable";
import Text from "./Text";
import { View } from "react-native";
import Button from "./Button";

interface ConfirmationPopUpProps {
  children: (args: { isOpen: boolean }) => JSX.Element;
  disabled?: boolean;
  onConfirmPress: () => void;
  onRejectPress: () => void;
  confirmButtonText: string;
  rejectButtonText: string;
  title: string;
  description: string;
}

export default class ConfirmationPopUp extends PureComponent<
  ConfirmationPopUpProps
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
          style={{
            children: {
              paddingBottom: 30
            }
          }}
          title={title}
          visible={isOpen}
          onClose={this.toggle}
        >
          <>
            <Text size={15} lineHeight={22}>
              {description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "space-between"
              }}
            >
              <Button
                style={{
                  width: "49%"
                }}
                type="secondary"
                onPress={onRejectPress}
              >
                {rejectButtonText}
              </Button>
              <Button
                style={{
                  width: "49%"
                }}
                onPress={onConfirmPress}
              >
                {confirmButtonText}
              </Button>
            </View>
          </>
        </ActionModal>
      </>
    );
  }
}
