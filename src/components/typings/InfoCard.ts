import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle
} from "react-native";

export interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  /**
   * @deprecated Use children instead of content.
   */
  content?: React.ReactNode;
  topRightElement?: React.ReactNode;
  expandable?: boolean;
  style?: {
    container?: StyleProp<ViewStyle>;
    topSection?: StyleProp<ViewStyle>;
    heading?: StyleProp<ViewStyle>;
    imageWrapper?: StyleProp<ImageStyle>;
  };
  disabled?: boolean;
}

export interface InfoCardState {
  isOpen: boolean;
}
