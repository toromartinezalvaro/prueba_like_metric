import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import style from "./SideMenu.module.scss";
import Icon from "../../assets/icons/Icon";

const sideMenu = props => {
  var itemForSlidebar = (styles, route, iconName, description) => {
    if (props.tower !== null) {
      const towerId = props.tower.id;
      route = route + towerId;
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
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.detailAdmin.value,
          "fas fa-book-open",
          "Detalle Admin"
        )}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.detail.value,
          "fas fa-book-open",
          "Detalle User"
        )}
      </div>
    </div>
  );
};

export default sideMenu;
