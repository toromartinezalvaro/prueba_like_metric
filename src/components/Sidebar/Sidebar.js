import React from 'react';
import { Link } from 'react-router-dom';

const sidebar = () => (
  <nav>
    <ul>
      <li><Link to="/dashboard/">Dashboard</Link></li>
      <li><Link to="/dashboard/building">Building</Link></li>
    </ul>
  </nav>
);

export default sidebar;