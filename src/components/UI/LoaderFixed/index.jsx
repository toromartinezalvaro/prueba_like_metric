/*
 * Created Date: Wednesday December 11th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 11th December 2019 2:14:34 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import Loader from 'react-loader-spinner';
import Styles from './LoaderFixed.module.scss';
import commonStyles from '../../../assets/styles/variables.scss';

const LoaderFixed = () => {
  return (
    <div className={Styles.loaderContainer}>
      <Loader
        type="ThreeDots"
        color={commonStyles.mainColor}
        height="100"
        width="100"
      />
    </div>
  );
};

export default LoaderFixed;
