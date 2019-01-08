declare module "@anarock/pebble/native/Icon" {
  import * as React from "react";

  class Icon extends React.PureComponent<{
    size?: number;
    name: string;
    color?: string;
  }> {}

  export default Icon;
}
