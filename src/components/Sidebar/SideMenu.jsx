import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import style from "./SideMenu.module.scss";
import Icon from "../../assets/icons/Icon";

const sideMenu = props => {
  var itemForSlidebar = (styles, route, iconName, description) => {
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
    <div className={style.SideMenu + " " + `${props.tower !== null ? style.OriginalWidth : style.ZeroWidth}` }>
      <div>
        <label>{props.tower ? props.tower.name : "" }</label>
      </div>
      <div className={style.IconsContainer}>
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.building.value + `${props.tower !== null ? props.tower.id : ""}`,
          "fa-building",
          "Esquema"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.areas,
          "fa-layer-group",
          "Areas"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.prime,
          "fa-sort-amount-up",
          "Primas"
        )}
      </div>
    </div>
  );
};

export default sideMenu;
