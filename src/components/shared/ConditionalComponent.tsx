import * as React from "react";

interface ConditionalComponentProps {
  conditional?: React.ReactNode;
  children: (conditional: React.ReactNode) => React.ReactNode;
}

// @ts-ignore
const ConditionalComponent: React.FunctionComponent<ConditionalComponentProps> = ({
  conditional,
  children
}) => {
  if (!conditional) return null;
  if (typeof conditional === "number" || typeof conditional === "string") {
    return children(conditional);
  } else {
    return conditional;
  }
};

export default ConditionalComponent;
