/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 30th January 2020 4:53:49 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import { TextField, Card, CardContent } from '@material-ui/core';
import Styles from './Market.module.scss';

const Market = (props) => {
  return (
    <Card classes={{ root: Styles.Container }}>
      <CardContent classes={{ root: Styles.Content }}>
        <h4 className={Styles.h4}>Mercado</h4>
        <TextField
          label="Precio Promedio"
          size="small"
          classes={{ root: Styles.TextField }}
        />
        <TextField label="E.A." size="small" />
      </CardContent>
    </Card>
  );
};

export default Market;
