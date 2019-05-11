import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import style from "./Sidebar.module.scss";
import Icon from "../../assets/icons/Icon";

const sidebar = () => {
  var itemForSlidebar = (styles, route, iconName) => {
    return (
      <div className={styles}>
        <Link to={route}>
          <Icon name={iconName} fixWidth={true} />
        </Link>
      </div>
    );
  };

  return (
    <div className={style.Sidebar}>
    {itemForSlidebar(style.MenuItem, DashboardRoutes.base + DashboardRoutes.projects, "fa-file-contract")}
    {itemForSlidebar(style.MenuItem, DashboardRoutes.base + DashboardRoutes.building, "fa-building")}
    {itemForSlidebar(style.MenuItem, DashboardRoutes.base + DashboardRoutes.areas, "fa-layer-group")}
    {itemForSlidebar(style.MenuItem, DashboardRoutes.base + DashboardRoutes.prime, "fa-sort-amount-up")}
    {itemForSlidebar(`${style.End} ${style.MenuItem}`, DashboardRoutes.base + DashboardRoutes.user, "fa-user-tie")}
    </div>
  );
};

export default sidebar;
