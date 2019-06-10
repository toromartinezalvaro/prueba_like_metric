import React from "react";
import styles from "./FloatingButton.module.scss";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../../routes/local/routes";
import TowerServices from "../../../services/Towers/TowerServices";

const FloatingButton = props => {
  return (
    <Link to={DashboardRoutes.base + "/"+ props.route.toLowerCase() + "/" + props.towerId}>
      <button className={styles.float} >
        Ir a {props.children} <i className="fas fa-angle-double-right" />
      </button>
    </Link>
  );
};

export default FloatingButton;
