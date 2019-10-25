import React, { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import styles from '../FutureSalesSpeed.module.scss';
import Numbers from '../../../helpers/numbers';

const getTotal = (salesSpeeds) =>
  salesSpeeds.reduce((current, next) => {
    current += next;
    return current;
  }, 0);

const futureSpeedValidation = (units) => [
  {
    fn: (value) => value >= 0,
    message: 'Debe ser mayor 0',
  },
  {
    fn: (value) => units / value <= 98,
    message: 'El numero de periodos no puede ser mayor a 98',
  },
  {
    fn: (value) => value < units,
    message: 'Debe ser menor a las unidades',
  },
];

const separateAndFirstFeeValidation = (finalFee, lastValue) => [
  {
    fn: (value) => value / 100 >= 0,
    message: 'Debe ser mayor 0%',
  },
  {
    fn: (value) => value <= 100 - (finalFee - lastValue) * 100,
    message: `Debe ser menor a ${100 - (finalFee - lastValue) * 100}%`,
  },
];

const DinamicCells = ({
  group,
  i,
  salesSpeeds,
  futureSalesSpeedHandler,
  separationHandler,
  initialFeeHandler,
  setTotal,
  arraySalesSpeeds,
  setPropsArraySalesSpeeds,
  ...rest
}) => {
  const [separate, setSeparate] = useState(group.separate);
  const [finalFee, setFinalFee] = useState(group.separate + group.initialFee);
  const [firstFee, setFirstFee] = useState(group.initialFee);

  return (
    <Fragment key={`fragment ${group.id}`}>
      <div className={styles.gridItem}>{group.name.slice(5)}</div>
      <div className={styles.gridItem}> {group.units}</div>
      <div className={styles.gridItem}>
        <NumberFormat
          value={group.averagePrice.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={styles.gridItem}>{group.averageArea.toFixed(2)}</div>
      <div className={styles.gridItem}>
        <Input
          validations={futureSpeedValidation(group.units)}
          value={group.futureSalesSpeed}
          style={{ width: '75px' }}
          onChange={(target) => {
            setPropsArraySalesSpeeds(i, target.value);
            setTotal(getTotal(arraySalesSpeeds).toFixed(2));
            futureSalesSpeedHandler(
              group.id,
              Numbers.toFixed(Number(target.value)),
            );
          }}
        />
      </div>
      <div className={styles.gridItem}>
        <Input
          validations={separateAndFirstFeeValidation(finalFee, separate)}
          value={(separate * 100).toFixed(2)}
          mask="percentage"
          style={{ width: '75px' }}
          onChange={(target) => {
            separationHandler(
              group.id,
              Numbers.toFixed(target.value / 100),
              (isRollback) => {
                if (isRollback) {
                  setFirstFee(0);
                  setFinalFee(0);
                  setFirstFee(separate);
                  setFinalFee(separate / 100 + firstFee);
                } else {
                  setFirstFee(target.value / 100);
                  setFinalFee(target.value / 100 + firstFee);
                }
              },
            );
          }}
        />
      </div>
      <div className={styles.gridItem}>
        <Input
          validations={separateAndFirstFeeValidation(finalFee, firstFee)}
          value={(firstFee * 100).toFixed(2)}
          mask="percentage"
          style={{ width: '75px' }}
          onChange={(target) => {
            initialFeeHandler(
              group.id,
              Numbers.toFixed(target.value / 100),
              (isRollback) => {
                if (isRollback) {
                  setFirstFee(0);
                  setFinalFee(0);
                  setFirstFee(firstFee);
                  setFinalFee(firstFee / 100 + separate);
                } else {
                  setFirstFee(target.value / 100);
                  setFinalFee(target.value / 100 + separate);
                }
              },
            );
          }}
        />
      </div>
      <div className={styles.gridItem}>
        <label>
          {
            <NumberFormat
              value={Numbers.toFixed(100 - finalFee * 100)}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'%'}
            />
          }
        </label>
      </div>
    </Fragment>
  );
};

export default DinamicCells;
