import React from 'react';
import { Link } from 'react-router-dom';
import style from './Sidebar.module.scss';

const sidebar = () => (
  <ul className={style.Sidebar}>
    <li><Link to="/dashboard/">Dashboard</Link></li>
    <li><Link to="/dashboard/building">Building</Link></li>
  </ul>
);

export default sidebar;