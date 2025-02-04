export interface SearchInputProps<OptionType> {
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  errorMessage?: string;
  results: OptionType[];
  searchBoxPlaceholder: string;
  onClose?: () => void;
  onSelect: (item: OptionType) => void;
  onQueryChange: (query: string) => void;
  renderElement?: (
    args: { item: OptionType },
    props: SearchInputProps<OptionType>
  ) => React.ReactNode;
  keyExtractor: (item: OptionType) => number | string;
  value?: string;
  rowLabelExtractor?: (item: OptionType) => string | number;
  noResultsElement?: (queryValue: string) => React.ReactNode;
  renderLabel?: (props: SearchInputProps<OptionType>) => React.ReactNode;
  bottomSectionPlaceholder?: () => React.ReactNode;
  loading?: boolean;
  beforeSelect?: (item: OptionType) => Promise<OptionType>;
  testIdPrefix?: string;
  extraActionElement?: (query: string) => React.ReactNode;
  openModal?: () => void;
}
