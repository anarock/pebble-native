import { CircularButtonProps } from "./CircularButton";

export interface IconTextProps extends CircularButtonProps {
  label: string;
  onPress?: () => void;
}
