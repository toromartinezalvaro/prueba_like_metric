import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './Sidebar.module.scss';

const sidebar = () => (
  <ul className={style.Sidebar}>
    <li><Link to={DashboardRoutes.base}>Dashboard</Link></li>
    <li><Link to={DashboardRoutes.base + DashboardRoutes.building}>Building</Link></li>
    <li><Link to={DashboardRoutes.base + DashboardRoutes.areas}>Areas</Link></li>
    <li><Link to={DashboardRoutes.base + DashboardRoutes.userInfo}>User</Link></li>
  </ul>
);

export default sidebar;