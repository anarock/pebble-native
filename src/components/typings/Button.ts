import * as React from "react";

export interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactChild;
  type?: "primary" | "secondary" | "link";
  loading?: boolean;
  style?: any;
}
