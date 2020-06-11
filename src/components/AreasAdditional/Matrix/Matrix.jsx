/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 13th December 2019 10:46:50 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import { InputAdornment } from '@material-ui/core';
import Styles from './Matrix.module.scss';
import Numbers from '../../../helpers/numbers';
import TextField from './TextField/TextField';
import stateTypes from './stateType.enum';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

const Matrix = (
  areaType,
  actualValue,
  arrayAreaTypesHandler,
  addAreaAdditionalHandler,
  updateAreaAdditionalHandler,
  actualValueHandler,
  index,
  disableSold,
) => {
  const onBlurNomenclature = (e, area, j, validation) => {
    if (e.target.value && e.target.value !== actualValue) {
      if (!validation) {
        if (area.id) {
          updateAreaAdditionalHandler(
            e.target.value,
            area.measure,
            area.price,
            area.id,
          );
        } else {
          let measure = 0;
          if (areaType.unit === 'UNT') {
            measure = 1;
          }
          addAreaAdditionalHandler(
            e.target.value,
            measure,
            '0',
            areaType.id,
            index,
            j,
          );
        }
      }
    }
  };

  const onBlurMeasure = (e, area, j) => {
    if (Number(e.target.value) > 0 && e.target.value !== actualValue) {
      if (area.id) {
        updateAreaAdditionalHandler(
          area.nomenclature,
          e.target.value,
          area.price,
          area.id,
        );
      } else {
        addAreaAdditionalHandler(
          '',
          e.target.value,
          '0',
          areaType.id,
          index,
          j,
        );
      }
    } else {
      arrayAreaTypesHandler(areaType.id, j, 'measure', actualValue);
    }
  };

  const onBlurPrice = (e, area, j) => {
    if (e.target.value !== '0' && e.target.value !== actualValue) {
      if (area.id) {
        updateAreaAdditionalHandler(
          area.nomenclature,
          area.measure,
          e.target.value,
          area.id,
        );
      } else {
        let measure = 0;
        if (areaType.unit === 'UNT') {
          measure = 1;
        }
        addAreaAdditionalHandler(
          '',
          measure,
          e.target.value,
          areaType.id,
          index,
          j,
        );
      }
    }
  };

  const additionalStatus = (area) => {
    if (area.property) {
      switch (area.property.status) {
        case stateTypes.Sold.code:
          return <div className={Styles.Sold}></div>;
        case stateTypes.Optional.code:
          return <div className={Styles.Option}></div>;
        default:
          return <div className={Styles.Available}></div>;
      }
    } else {
      return <div className={Styles.Available}></div>;
    }
  };

  const data = areaType.additionalAreas.map((area, j) => {
    return {
      nomenclature: (
        <TextField
          key={`nomenclature${j}`}
          id={area.id}
          value={area.nomenclature}
          typeOfTextField={'number'}
          onBlur={(e, validation) => {
            onBlurNomenclature(e, area, j, validation);
          }}
          arrayAreaTypesHandler={(id, value) =>
            arrayAreaTypesHandler(id, j, 'nomenclature', value)
          }
          actualValueHandler={(value) => actualValueHandler(value)}
          areaType={areaType}
          InputProps={{
            classes: {
              input: Styles.ContainerTexField,
            },
          }}
          disabled={area.property && area.property.status === 'SOLD'}
        />
      ),
      measure: (
        <TextField
          key={`measure${j}`}
          value={area.measure}
          typeOfTextField={'number'}
          onBlur={(e) => onBlurMeasure(e, area, j)}
          arrayAreaTypesHandler={(id, value) =>
            arrayAreaTypesHandler(id, j, 'measure', value)
          }
          actualValueHandler={(value) => actualValueHandler(value)}
          areaType={areaType}
          InputProps={{
            classes: {
              input: Styles.ContainerTexField,
            },
          }}
          disabled={area.property && area.property.status === 'SOLD'}
        />
      ),
      price: (
        <div key={`price${j}`}>
          <TextField
            value={area.price}
            typeOfTextField={'number'}
            InputProps={{
              inputComponent: NumberFormatCustom,
              classes: {
                input: Styles.ContainerTexField,
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onBlur={(e) => onBlurPrice(e, area, j)}
            arrayAreaTypesHandler={(id, value) =>
              arrayAreaTypesHandler(id, j, 'price', value)
            }
            actualValueHandler={(value) => actualValueHandler(value)}
            areaType={areaType}
            disabled={area.property && area.property.status === 'SOLD'}
          />
        </div>
      ),
      total: (
        <span key={`total${j}`} className={Styles.Price}>
          <NumberFormat
            value={Numbers.toFixed(area.measure * area.price)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            disabled={area.property && area.property.status === 'SOLD'}
          />
        </span>
      ),
      status: additionalStatus(area),
    };
  });

  return data;
};

export default Matrix;
