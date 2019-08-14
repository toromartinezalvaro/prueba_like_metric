import React from "react";
import NumberFormat from "react-number-format";

const radialLabel = props => {
  const format = (value, prime) => (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      renderText={value => (
        <tspan x="0" dy="1.6em">
          {prime}
          {value}
        </tspan>
      )}
    />
  );

  return (
    <React.Fragment>
      <tspan x="0" dy="-0.6em">
        {props.object.label}
      </tspan>
      {props.print ? format(props.object.price, "Precio: ") : null}
      {props.object.label == "Interior"
        ? format(props.object.prime, "Prima: ")
        : null}
    </React.Fragment>
  );
};

export default radialLabel;
