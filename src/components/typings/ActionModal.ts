import { GestureResponderEvent } from "react-native";

export interface ActionModalProps {
  onClose: (e?: GestureResponderEvent) => void;
  title?: string;
  buttonLabel?: string;
  onButtonClick?: (e: GestureResponderEvent) => void;
  showFooterButton?: boolean;
  visible: boolean;
  header?: string | JSX.Element;
  headerType?: "success" | "error" | "warning";
  style?: any;
}
