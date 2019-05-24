import React from "react";
import NumberFormat from "react-number-format";

const radialLabel = props => {
  const format = <NumberFormat value={props.object.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <tspan x="0" dy="1.6em">{value}</tspan>} />


  return (
    <React.Fragment>
      <tspan x="0" dy="-0.6em">
        {props.object.label}
      </tspan>
      {props.print ? format : null}
    </React.Fragment>
  );
};

export default radialLabel;
