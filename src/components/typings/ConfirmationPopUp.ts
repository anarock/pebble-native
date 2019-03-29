export interface ConfirmationPopUpProps {
  children: (args: { isOpen: boolean }) => JSX.Element;
  disabled?: boolean;
  onConfirmPress: () => void;
  onRejectPress: () => void;
  confirmButtonText: string;
  rejectButtonText: string;
  title: string;
  description: string;
}

export interface ConfirmationPopUpState {
  isOpen: boolean;
}
