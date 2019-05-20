import React, {useState} from "react";
import styles from "../Property/Property.module.scss";

const property = props => {

  const [color, setColor] = useState("");
  const [bool, setBool] = useState(true);


  const handleOnClick = () => {
    console.log("click");
    
    if (bool) {
      setColor("#ccc");
      setBool(false);
    } else {
      setColor("#fff");
      setBool(true);
    }
  }

  const Cell = props => {
    return <div className={styles.Cell} onClick={handleOnClick} style={props.style}>{props.children}</div>;
  };

  return (
    <div>
      <div className={styles.Row}>
        <Cell  style={{backgroundColor: "#29339B", color: "#fff"}}>101</Cell>
        <Cell>102</Cell>
        <Cell>103</Cell>
      </div>
      <div className={styles.Row}>
        <Cell>201</Cell>
        <Cell>202</Cell>
        <Cell>203</Cell>
      </div>
    </div>
  );
};

export default property;
