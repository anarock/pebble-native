import { ImageSourcePropType } from "react-native";

export interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  content?: JSX.Element;
  topRightElement?: JSX.Element;
  expandable?: boolean;
}

export interface InfoCardState {
  isOpen: boolean;
}
