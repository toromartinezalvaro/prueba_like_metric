import React from "react";
import Collapsible from "react-collapsible";
import style from "./Accordion.scss";

const accordion = ({ trigger, children, ...rest }) => {
  const collapsibleTriggerStyle = {};

  return (
    <Collapsible
      trigger={trigger}
      triggerStyle={collapsibleTriggerStyle}
      {...rest}
    >
      {children}
    </Collapsible>
  );
};

export default accordion;
