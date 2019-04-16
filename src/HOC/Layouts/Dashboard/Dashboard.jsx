import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar'
import styles from './Dashboard.module.scss';

const dashboard = props => (
  <div className={styles.Dashboard}>
    <nav>
      <Sidebar />
    </nav>

    <main className={styles.Content}>
      {props.children}
    </main>
  </div>
);


export default dashboard;