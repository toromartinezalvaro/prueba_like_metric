/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 30th January 2020 4:34:50 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import styles from './SelectStrategy.module.scss';
import variables from '../../../assets/styles/variables.scss';
import Button from '../../UI/Button/Button';

const SelectStrategy = (props) => {
  const { dataHelper, groupActive, strategyActive, selectStrategy } = props;
  return (
    <Card classes={{ root: styles.Container }}>
      <CardContent classes={{ root: styles.Content }}>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h4>Selecciona la estrategia para el {groupActive.type}</h4>
          {groupActive.strategies.map((group, index) => {
            if (index !== 0) {
              let styleButton = {
                backgroundColor: variables.grayColor,
              };
              
              if (
                strategyActive === dataHelper[index].id &&
                !groupActive.isReset
              ) {
                styleButton = {
                  backgroundColor: dataHelper[index].borderColor,
                };
              }
              return (
                <Button
                  disabled={strategyActive && !groupActive.isReset}
                  onClick={() => selectStrategy(index, dataHelper[index].id)}
                  style={styleButton}
                >
                  {dataHelper[index].label}
                </Button>
              );
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
};

SelectStrategy.propTypes = {
  dataHelper: PropTypes.array,
  groupActive: PropTypes.object,
  strategyActive: PropTypes.number,
  selectStrategy: PropTypes.func,
};

export default SelectStrategy;
