import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import style from "./SideMenu.module.scss";
import Icon from "../../assets/icons/Icon";

const sideMenu = props => {
  var itemForSlidebar = (styles, route, iconName, description) => {
    //TODO: REMOVE hardcoded towerId
    if (props.tower !== null) {
      const towerId = props.tower.id;
      const projectId = props.tower.projectId;
      route = route + projectId + `/${towerId}`;
    }
    return (
      <div className={styles}>
        <Link to={route}>
          <Icon name={iconName} fixWidth={true} />
          <label className={style.Description}> {description} </label>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={
        style.SideMenu +
        " " +
        //TODO: comment this line to test in develop environment
        `${props.tower !== null ? style.OriginalWidth : style.ZeroWidth}`
      }
    >
      <div>
        <label>{props.tower ? props.tower.name : ""}</label>
      </div>
      <div className={style.IconsContainer}>
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.building.value,
          "fa-building",
          "Esquema"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.areas.value,
          "fa-layer-group",
          "Areas"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.prime.value,
          "fa-sort-amount-up",
          "Primas"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.summary.value,
          "fa-list-ol",
          "Resumen"
        )}
      </div>
    </div>
  );
};

export default sideMenu;
