import React, { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import styles from './FutureSalesSpeed.module.scss';
import Numbers from '../../helpers/numbers';
import DynamicCells from './DynamicCells/DynamicCells';

const getTotal = (salesSpeeds) =>
  salesSpeeds.reduce((current, next) => {
    current += next;
    return current;
  }, 0);

const inputValidation = (units) => [
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

const FutureSalesSpeed = ({
  salesSpeeds,
  futureSalesSpeedHandler,
  separationHandler,
  initialFeeHandler,
  ...rest
}) => {
  const [total, setTotal] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const [arraySalesSpeeds, setArraySalesSpeeds] = useState([]);
  const [separate, setSeparate] = useState(0);
  const [finalFee, setFinal] = useState(0);
  const [firstFee, setInitial] = useState(0);

  const { groups } = salesSpeeds;
  if (groups !== undefined) {
    if (isEmpty) {
      const arrayTemporal = groups.map((group) => group.futureSalesSpeed);
      setArraySalesSpeeds(arrayTemporal);
      setTotal(getTotal(arrayTemporal));
      setIsEmpty(false);
    }
  }

  const setPropsArraySalesSpeeds = (i, value) => {
    arraySalesSpeeds[i] = Number(value);
  };

  const firstFeeHandler = (target) => {
    this.setState({
      firstFee: target.value,
      finalFee: 100 - target.value - separate,
    });
  };

  const creditHandler = (target) => {
    this.setState({
      credit: target.value,
      firstFee: 100 - target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <span>Velocidad de ventas futuras</span>
      </CardHeader>
      <CardBody>
        {arraySalesSpeeds.length !== 0 ? (
          <div className={styles.ContainerFlex}>
            <h4 className={styles.gridItem}>Tipo</h4>
            <h4 className={styles.gridItem}>Unidades</h4>
            <h4 className={styles.gridItem}>Valor prom</h4>
            <h4 className={styles.gridItem}>m² prom</h4>
            <h4 className={styles.gridItem}>Velocidad ventas futura</h4>
            <h4 className={styles.gridItem}>Separación</h4>
            <h4 className={styles.gridItem}>Cuota inicial</h4>
            <h4 className={styles.gridItem}>Cuota Final</h4>

            {groups !== undefined
              ? groups.map((group, i) => (
                  <DynamicCells
                    group={group}
                    i={i}
                    salesSpeeds={salesSpeeds}
                    futureSalesSpeedHandler={futureSalesSpeedHandler}
                    separationHandler={separationHandler}
                    initialFeeHandler={initialFeeHandler}
                    setTotal={setTotal}
                    arraySalesSpeeds={arraySalesSpeeds}
                    setPropsArraySalesSpeeds={setPropsArraySalesSpeeds}
                    key={i}
                  />
                ))
              : null}
            <div className={styles.gridItem} />
            <div className={styles.gridItem} />
            <div className={styles.gridItem} />
            <h4 className={styles.gridItem}>Total: </h4>
            <div className={styles.gridItem}>
              {Numbers.toFixed(Number(total))}
            </div>
          </div>
        ) : (
          <span>No hay grupos disponibles</span>
        )}
      </CardBody>
    </Card>
  );
};

export default FutureSalesSpeed;
