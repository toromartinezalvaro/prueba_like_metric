import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import style from "./Sidebar.module.scss";
import Icon from "../../assets/icons/Icon";

const sidebar = () => (
  <div className={style.Sidebar}>
    <div className={style.MenuItem}>
      <Link to={DashboardRoutes.base + DashboardRoutes.projects}>
        <Icon name="fa-file-contract" fixWidth={true} />
      </Link>
    </div>
    <div className={style.MenuItem}>
      <Link to={DashboardRoutes.base + DashboardRoutes.building}>
        <Icon name="fa-building" fixWidth={true} />
      </Link>
    </div>
    <div className={style.MenuItem}>
      <Link to={DashboardRoutes.base + DashboardRoutes.areas}>
        <Icon name="fa-layer-group" fixWidth={true} />
      </Link>
    </div>
    <div className={`${style.MenuItem}`}>
      <Link to={DashboardRoutes.base + DashboardRoutes.prime}>
        <Icon name="fa-sort-amount-up" fixWidth={true} />
      </Link>
    </div>
    <div className={`${style.End} ${style.MenuItem}`}>
      <Link to={DashboardRoutes.base + DashboardRoutes.user}>
        <Icon name="fa-user-tie" fixWidth={true} />
      </Link>
    </div>   
  </div>
);

export default sidebar;
