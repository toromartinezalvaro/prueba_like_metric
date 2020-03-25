import React from 'react';
import {
  Card,
  Button,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';

import styles from './Companies.module.scss';

const AssignedCompanies = (props) => {
  return (
    <Card variant="outlined" classes={{ root: styles.cardRight }}>
      <div className={styles.titleContainer}>
        <h3>Compañías y Proyectos asociados</h3>
      </div>
    </Card>
  );
};

export default AssignedCompanies;
