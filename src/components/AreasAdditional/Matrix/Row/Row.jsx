/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 5:06:44 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */
/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 3:53:43 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Styles from './Row.module.scss';

const Row = (props) => {
  /* const [nomenclature, setNomenclature] = React.useState('');
  const [measure, setMeasure] = React.useState('');
  const [price, setPrice] = React.useState(''); */

  // const onBlur = () => {
  //   props.addAreaAdditionalHandler(nomenclature, measure, price);
  // };

  // const onChange = (event) => {
  //   setNomenclature(event.target.value);
  // };

  return [
    // <TextField
    //   className={Styles.TextField}
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   value={nomenclature}
    //   margin="normal"
    // />,
    // <TextField className={Styles.TextField} value={measure} margin="normal" />,
    // <TextField className={Styles.TextField} value={price} margin="normal" />,
    <span className={Styles.Price}>10</span>,
    <span className={Styles.Price}>10</span>,
    <span className={Styles.Price}>10</span>,
    <span className={Styles.Price}>10</span>,
  ];
};

export default Row;
