import { PureComponent, default as React } from "react";
import Select from "../components/Select";
import { ViewerProps, ViewerState } from "./typings/Viewer";
export default class extends PureComponent<ViewerProps, ViewerState> {
  selectRef: React.RefObject<Select>;
  state: {
    showUnfollowConfirmation: boolean;
    selectedAgentId: any;
    showTransferConfirmation: boolean;
    showTransferAndFollowConfiguration: boolean;
  };
  private toggleTransferConfirmationModal;
  toggleTransferAndFollowConfigurationModal: () => void;
  toggleUnfollowConfirmationModal: () => void;
  private isUser;
  render(): JSX.Element;
}
