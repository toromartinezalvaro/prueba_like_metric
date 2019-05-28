import React, { useState } from "react";
import styles from "../Property/Property.module.scss";

const property = props => {


  return (
    <div>
      <div className={styles.Cell}  style={props.style} >
        {props.property.nomenclature}
      </div>      
    </div>
  );
};

export default property;
