/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Friday, 31st January 2020 1:59:33 pm
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
  const {
    groupActive,
    dataHelper,
    strategyActive,
    selectStrategy,
    putMarketAveragePrice,
    putMarketAnnualEffectiveIncrement,
    changeMarketAveragePrice,
    changeMarketAnnualEffectiveIncrement,
  } = props;

  return (
    <div className={styles.Container}>
      <Market
        id={groupActive.id}
        averagePrice={groupActive.marketDefinitions.averagePrice}
        anualEffectiveIncrement={
          groupActive.marketDefinitions.anualEffectiveIncrement
        }
        putMarketAveragePrice={putMarketAveragePrice}
        putMarketAnnualEffectiveIncrement={putMarketAnnualEffectiveIncrement}
        changeMarketAveragePrice={changeMarketAveragePrice}
        changeMarketAnnualEffectiveIncrement={
          changeMarketAnnualEffectiveIncrement
        }
      ></Market>
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
  putMarketAveragePrice: PropTypes.func,
  putMarketAnnualEffectiveIncrement: PropTypes.func,
  changeMarketAveragePrice: PropTypes.func,
  changeMarketAnnualEffectiveIncrement: PropTypes.func,
};

export default MarketAndSelectStrategy;
