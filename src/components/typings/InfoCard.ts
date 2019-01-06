export interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  onPress?: () => void;
  image?: any;
  content?: JSX.Element;
  topRightElement?: JSX.Element;
  expandable?: boolean;
}

export interface InfoCardState {
  isOpen: boolean;
}
