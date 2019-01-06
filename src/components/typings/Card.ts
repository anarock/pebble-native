export interface CardProps {
  title: string;
  linkText?: string;
  description: string | number | JSX.Element;
  onPress?: () => void;
}
