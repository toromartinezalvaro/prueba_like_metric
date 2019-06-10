import React, { Fragment, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import commonStyles from "../../../assets/styles/variables.scss";
import styles from "./Card.module.scss";
import CardHeader from "./CardHeader/CardHeader";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";

const card = props => {
  const [loading, setLoading] = useState(props.loading);
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);
  return (
    <div className={styles.Card} style={props.style}>
      {loading ? (
        <div className={styles.Loader}>
          <Loader
            type="Puff"
            color={commonStyles.mainColor}
            height="100"
            width="100"
          />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default card;
export { CardHeader, CardBody, CardFooter };
