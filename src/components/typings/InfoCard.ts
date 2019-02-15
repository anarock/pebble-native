import { ImageSourcePropType } from "react-native";

export interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  /**
   * @deprecated Use children instead of content.
   */
  content?: JSX.Element;
  topRightElement?: JSX.Element;
  expandable?: boolean;
  style?: {
    container?: any;
  };
}

export interface InfoCardState {
  isOpen: boolean;
}
