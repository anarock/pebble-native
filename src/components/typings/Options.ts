export interface OptionsProps<OptionType> {
  options: OptionType[];
  onSelect: (suggestion: OptionType[]) => void;
  rowRenderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
    },
    props: OptionsProps<OptionType>
  ) => JSX.Element | string;
  dropdownStyle?: any;
  width?: number | string;
  selected?: OptionType;
  keyExtractor: (item: OptionType) => number | string;
  type?: "radio" | "checkbox";
  rowLabelExtractor: (item: OptionType) => JSX.Element | string | number;
  testIdPrefix?: string;
}
