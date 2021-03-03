import * as React from "react";
import { Key } from "./common";

export interface FallbackOptionType {
  id: Key;
  label?: string;
  name?: string;
}

type Selected = Key;

export interface CommonOptionProps<OptionType> {
  options: OptionType[];
  width?: string | number;
  testIdPrefix?: string;
  keyExtractor: (item: OptionType) => Key;
  rowLabelExtractor?: (item: OptionType) => React.ReactNode;
  rowRenderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
    },
    props: OptionsProps<OptionType>
  ) => React.ReactNode;
}

export interface RadioOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type?: "radio";
  onSelect: (suggestion: OptionType) => void;
  selected?: Selected;
}

export interface CheckboxOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type: "checkbox";
  onSelect: (suggestion: OptionType[]) => void;
  selected?: Selected[];
}

export type OptionsProps<OptionType> =
  | RadioOptionProps<OptionType>
  | CheckboxOptionProps<OptionType>;
