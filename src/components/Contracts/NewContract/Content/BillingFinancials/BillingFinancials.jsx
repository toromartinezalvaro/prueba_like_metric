/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import styles from './BillingFinancials.module.scss';

const BillingFinancials = (services) => {
  const [id, setId] = useState(0);
  const [components, setComponents] = useState([]);
  const autoIncrementId = () => setId(id + 1);
  const addBilling = () => {
    setComponents(...components, [
      <Card key={autoIncrementId()}>
        <CardContent>
          <div className={styles.row}>
            <div className={styles.column}>
              <TextField
                required
                fullWidth
                className={styles.textField}
                label="Titulo De Contrato"
                margin="normal"
                variant="outlined"
              />
            </div>
          </div>
        </CardContent>
      </Card>,
    ]);
  };
  return (
    <Fragment>
      {components}
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        startIcon={<AddIcon />}
        onClick={addBilling}
      >
        Agregar Transacción de Facturas
      </Button>
    </Fragment>
  );
};

export default BillingFinancials;
