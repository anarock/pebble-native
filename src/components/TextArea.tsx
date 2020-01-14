import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Input from "./Input";
import { TextAreaProps } from "./typings/TextArea";

const styles = StyleSheet.create({
  textArea: {
    marginTop: 30,
    minHeight: 60,
    lineHeight: 15,
    textAlignVertical: "top"
  }
});

const TextArea: FC<TextAreaProps> = ({
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
        numberOfLines
      }}
    />
  );
};

export default TextArea;
