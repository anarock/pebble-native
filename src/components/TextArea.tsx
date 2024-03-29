import * as React from "react";
import { StyleSheet } from "react-native";
import Input from "./Input";
import { TextAreaProps } from "./typings/TextArea";

const styles = StyleSheet.create({
  textArea: {
    marginTop: 12,
    minHeight: 60,
    lineHeight: 15,
    textAlignVertical: "top"
  }
});

const TextArea: React.FC<TextAreaProps> = ({
  inputProps,
  numberOfLines = 3,
  style,
  textInputStyles,
  ...passProps
}) => {
  return (
    <Input
      {...passProps}
      style={[style, { height: "auto" }]}
      textInputStyles={[styles.textArea, textInputStyles]}
      inputProps={{
        ...inputProps,
        multiline: true,
        scrollEnabled: false,
        numberOfLines
      }}
    />
  );
};

export default TextArea;
