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

const TextArea: FC<TextAreaProps> = () => {
  const {
    inputProps,
    style,
    textArea,
    textInputStyles,
    ...passProps
  } = this.props;

  return (
    <Input
      {...passProps}
      style={[
        textArea && {
          height: "auto"
        },
        style
      ]}
      textInputStyles={[textArea && styles.textArea, textInputStyles]}
      inputProps={{
        ...inputProps,
        multiline: true
      }}
    />
  );
};

export default TextArea;
