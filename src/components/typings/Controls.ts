import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Key } from "./common";

type Selected = Key;

export interface FallbackOptionType {
  id: Key;
  label?: string;
  name?: string;
}

export interface CommonControlsProps<OptionType> {
  data: OptionType[];
  allowToggle?: boolean;
  style?: Partial<{
    wrapper: StyleProp<ViewStyle>;
    itemWrapper: StyleProp<ViewStyle>;
  }>;
  ripple?: boolean;
  testIdPrefix?: string;
  keyExtractor?: (item: OptionType) => Key;
  renderLabel?: (args: { item: OptionType }) => React.ReactNode;
  disabled?: boolean | Key[];
  renderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
      renderLabel?: (args: { item: OptionType }) => React.ReactNode;
    },
    props: ControlsProps<OptionType>
  ) => React.ReactNode;
}

export interface RadioControlsProps<OptionType>
  extends CommonControlsProps<OptionType> {
  type?: "radio";
  selected?: Selected;
  onChange: (
    args: {
      selected?: Selected;
    },
    props: RadioControlsProps<OptionType>
  ) => void;
}

export interface CheckboxControlsProps<OptionType>
  extends CommonControlsProps<OptionType> {
  type: "checkbox";
  selected?: Selected[];
  onChange: (
    args: {
      selected: Selected[];
    },
    props: CheckboxControlsProps<OptionType>
  ) => void;
}

export type ControlsProps<OptionType> =
  | RadioControlsProps<OptionType>
  | CheckboxControlsProps<OptionType>;
