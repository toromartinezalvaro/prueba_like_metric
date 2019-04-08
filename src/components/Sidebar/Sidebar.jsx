import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/local/dashboard';
import style from './Sidebar.module.scss';

const sidebar = () => (
  <ul className={style.Sidebar}>
    <li><Link to="/dashboard/">Dashboard</Link></li>
    <li><Link to="/dashboard/building">Building</Link></li>
    <li><Link to={routes.base + routes.area}>Areas</Link></li>
  </ul>
);

export default sidebar;