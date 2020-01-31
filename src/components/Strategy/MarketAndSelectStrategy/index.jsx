/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 30th January 2020 4:56:07 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import PropTypes from 'prop-types';
import Market from '../Market';
import SelectStrategy from '../SelectStrategy';
import styles from './MarketAndSelectStrategy.module.scss';

const MarketAndSelectStrategy = (props) => {
  const { groupActive, dataHelper, strategyActive, selectStrategy } = props;

  return (
    <div className={styles.Container}>
      <Market id={groupActive.id}></Market>
      <SelectStrategy
        dataHelper={dataHelper}
        groupActive={groupActive}
        strategyActive={strategyActive}
        selectStrategy={selectStrategy}
      ></SelectStrategy>
    </div>
  );
};

MarketAndSelectStrategy.propTypes = {
  dataHelper: PropTypes.array,
  groupActive: PropTypes.object,
  strategyActive: PropTypes.number,
  selectStrategy: PropTypes.func,
};

export default MarketAndSelectStrategy;
