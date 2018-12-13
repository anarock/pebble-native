export interface SearchInputProps {
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  errorMessage?: string;
  results: any[];
  searchBoxPlaceholder: string;
  onSelect: (item: any) => void;
  onQueryChange: (query: string) => void;
  renderElement?: (
    args: {
      item: any;
    },
    props: SearchInputProps
  ) => JSX.Element | string | number;
  keyExtractor: (item: any) => number | string;
  value?: string;
  rowLabelExtractor?: (item: any) => string | number;
  noResultsElement?: (queryValue: string) => JSX.Element;
  renderLabel?: (props: SearchInputProps) => JSX.Element;
  bottomSectionPlaceholder?: () => JSX.Element;
}
