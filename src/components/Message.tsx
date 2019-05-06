import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 25
  },
  title: {
    marginBottom: 12
  },
  linkText: {
    textDecorationLine: "underline"
  }
});

interface MessageProps {
  backgroundColor: string;
  title?: string | JSX.Element;
  description: string | JSX.Element;
  linkText?: string;
  onPress?: () => void;
}

const Message: React.FunctionComponent<MessageProps> = ({
  backgroundColor,
  title,
  description,
  linkText,
  onPress
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={!onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor
          }
        ]}
      >
        {
          <ConditionalComponent conditional={title}>
            {_title => (
              <Text
                bold
                style={styles.title}
                size={15}
                lineHeight={22}
                color={colors.gray.darker}
              >
                {_title}
              </Text>
            )}
          </ConditionalComponent>
        }

        <Text>
          {
            <ConditionalComponent conditional={description}>
              {_description => (
                <Text size={13} lineHeight={18} color={colors.gray.darker}>
                  {_description}
                </Text>
              )}
            </ConditionalComponent>
          }
          <Text
            style={styles.linkText}
            size={13}
            lineHeight={18}
            color={colors.gray.darker}
          >
            {" "}
            {linkText}
          </Text>
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Message;
