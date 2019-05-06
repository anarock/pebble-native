export interface MessageProps {
  backgroundColor: string;
  title?: string | JSX.Element;
  description: string | JSX.Element;
  linkText?: string;
  onPress?: () => void;
}
