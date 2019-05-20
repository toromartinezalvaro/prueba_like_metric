import React from "react";

const radialLabel = props => {
  return (
    (
      <React.Fragment>
        <tspan x="0" dy="-0.6em">
          {props.object.id}
        </tspan>
        {props.print ? (
          <tspan x="0" dy="1.6em">
            {props.object.price}
          </tspan>
        ) : null}
      </React.Fragment>
    )
  );
};

export default radialLabel;
