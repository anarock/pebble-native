interface Agent {
  id: number;
  name: string;
  subText: JSX.Element;
  phone: string;
}

export interface ViewerProps {
  onTranferRequest: (args: { agentId: number; follow: boolean }) => void;
  onUnfollowRequest: () => void;
  agents: {
    id: boolean;
    label: string;
  }[];
  viewers: Agent[];
  owner: Agent;
  userId: number;
  onCall: (phone: string) => void;
}

export interface ViewerState {
  showUnfollowConfirmation: boolean;
  selectedAgentId: boolean;
  showTransferConfirmation: boolean;
  showTransferAndFollowConfiguration: boolean;
}
