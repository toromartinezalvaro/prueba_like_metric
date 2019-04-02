import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar'

const dashboard = props => (
  <div>
    <Sidebar />
    <main>
      {props.children}
    </main>
  </div>
);

export default dashboard;