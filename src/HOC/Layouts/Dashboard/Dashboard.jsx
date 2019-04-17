import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar'
import styles from './Dashboard.module.scss';

const dashboard = ({children}) => (
  <div className={styles.Dashboard}>
    <nav>
      <Sidebar />
    </nav>

    <main className={styles.Content}>
      {children}
    </main>
  </div>
);

export default dashboard;