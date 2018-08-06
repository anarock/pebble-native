export interface OptionsProps {
  options: any[];
  onSelect: (suggestion: any) => void;
  rowRenderElement: (
    args: {
      item: any;
      isSelected: boolean;
    },
    props: OptionsProps
  ) => JSX.Element | string;
  dropdownStyle?: any;
  width?: number | string;
  selected?: any;
  keyExtractor?: (item) => number | string;
  type?: "radio" | "checkbox";
}
