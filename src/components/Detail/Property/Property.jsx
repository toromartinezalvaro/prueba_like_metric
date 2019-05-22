import React, { useState } from "react";
import styles from "../Property/Property.module.scss";

const property = props => {
  var cells = properties => {
    return properties.map(property => {
      return Cell(property);
    });
  };

  const handleOnClick = () => {
    console.log("click");
  };

  const Cell = property => {
    return (
      <div className={styles.Cell} onClick={handleOnClick}>
        {property.nomenclature}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.Row}>
        {cells(props.properties)}
      </div>
    </div>
  );
};

export default property;
