export interface ConfirmationPopUpProps {
  onConfirmPress: () => void;
  onRejectPress: () => void;
  confirmButtonText: string;
  rejectButtonText: string;
  title: string;
  description: string;
  visible: boolean;
  onClose: () => void;
}
