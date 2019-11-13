/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 4:46:15 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import { TextField } from '@material-ui/core';
import Styles from './Matrix.module.scss';
import Row from './Row/Row';
const Matrix = (areaType, addAreaAdditionalHandler) => {
  const data = [];
  for (let i = 0; i < areaType.quantity; i += 1) {
    data.push(Row(addAreaAdditionalHandler));
  }
  console.log(data);
  return data;
};

export default Matrix;
