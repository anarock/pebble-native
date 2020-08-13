import { StyleProp, ViewStyle } from "react-native";

export interface OptionsProps {
  options: any[];
  onSelect: (suggestion: any) => void;
  rowRenderElement?: (
    args: {
      item: any;
      isSelected: boolean;
    },
    props: OptionsProps
  ) => JSX.Element | string;
  width?: number | string;
  selected?: any;
  keyExtractor?: (item: any) => number | string;
  type?: "radio" | "checkbox";
  rowLabelExtractor: (item: any) => JSX.Element | string | number;
  testIdPrefix?: string;
  styles?: Partial<{
    optionWrapper: StyleProp<ViewStyle>;
    row: StyleProp<ViewStyle>;
  }>;
}
