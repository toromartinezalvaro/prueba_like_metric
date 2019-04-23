import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './Sidebar.module.scss';
import Icon from '../../assets/icons/Icon';

const sidebar = () => (
  <div className={style.Sidebar}>
    <div><Link to={DashboardRoutes.base}></Link></div>
    <div><Link to={DashboardRoutes.base + DashboardRoutes.building}><Icon prefix="far" name="fa-building" fixWidth={true} /></Link></div>
    <div><Link to={DashboardRoutes.base + DashboardRoutes.areas}><Icon prefix="fas" name="fa-layer-group" fixWidth={true} /></Link></div>
    <div><Link to={DashboardRoutes.base + DashboardRoutes.user}><Icon prefix="fas" name="fa-user-tie" fixWidth={true} /></Link></div>
  </div>
);

export default sidebar;