import * as React from "react";
interface ConditionalComponentProps {
  conditional?: React.ReactText | JSX.Element;
  children: (conditional: React.ReactText | JSX.Element) => JSX.Element;
}
declare const ConditionalComponent: React.FunctionComponent<
  ConditionalComponentProps
>;
export default ConditionalComponent;
