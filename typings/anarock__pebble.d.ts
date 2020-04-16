declare module "pebble-shared/native/Icon" {
  import * as React from "react";

  class Icon extends React.PureComponent<{
    size?: number;
    name: string;
    color?: string;
    style?: any;
    onPress?: () => void;
  }> {}

  export default Icon;
}
