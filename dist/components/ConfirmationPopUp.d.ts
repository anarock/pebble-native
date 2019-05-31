import { ConfirmationPopUpProps } from "./typings/ConfirmationPopUp";
export default function ConfirmationPopUp({
  title,
  description,
  onConfirmPress,
  onRejectPress,
  confirmButtonText,
  rejectButtonText,
  visible,
  onClose
}: ConfirmationPopUpProps): JSX.Element;
