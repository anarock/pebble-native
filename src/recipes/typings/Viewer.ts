interface Agent {
  id: number;
  name: string;
  subText: JSX.Element;
  phone: string;
  color: string;
}

export interface ViewerProps {
  onTranferRequest: (args: { agentId: number; follow: boolean }) => void;
  onUnfollowRequest: () => void;
  viewers: Agent[];
  owner: Agent;
  userId: number;
  onCall: (phone: string) => void;
  disabled?: boolean;
}

export interface ViewerState {
  showUnfollowConfirmation: boolean;
  selectedAgentId: number | null;
  showTransferConfirmation: boolean;
  showTransferAndFollowConfiguration: boolean;
}
