import React, { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import styles from './FutureSalesSpeed.module.scss';

const getTotal = salesSpeeds => salesSpeeds.reduce((current, next) => {
  current += next;
  return current;
}, 0);

const inputValidation = units => [
  {
    fn: value => value >= 0,
    message: 'Debe ser mayor 0',
  },
  {
    fn: value => units / value <= 98,
    message: 'El numero de periodos no puede ser mayor a 98',
  },
  {
    fn: value => value < units,
    message: 'Debe ser menor a las unidades',
  },
];

const FutureSalesSpeed = ({
  salesSpeeds,
  futureSalesSpeedHandler,
  ...rest
}) => {
  const [total, setTotal] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const [arraySalesSpeeds, setArraySalesSpeeds] = useState([])
  const { groups } = salesSpeeds;
  if (groups !== undefined) {
    if (isEmpty) {
      const arrayTemporal = groups.map(group => group.futureSalesSpeed)
      setArraySalesSpeeds(arrayTemporal);
      setTotal(getTotal(arrayTemporal));
      setIsEmpty(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <span>Velocidad de ventas futuras</span>
      </CardHeader>
      <CardBody>
        <div className={styles.ContainerFlex}>
          <h4 className={styles.gridItem}>Tipo</h4>
          <h4 className={styles.gridItem}>Unidades</h4>
          <h4 className={styles.gridItem}>Valor prom</h4>
          <h4 className={styles.gridItem}>m² prom</h4>
          <h4 className={styles.gridItem}>Velocidad ventas futura</h4>
          {groups !== undefined
            ? groups.map((group, i) => <Fragment key={`fragment ${group.id}`}>
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
                    <div className={styles.gridItem}>
                      {group.averageArea.toFixed(2)}
                    </div>
                    <div className={styles.gridItem}>
                      <Input
                        validations={inputValidation(group.units)}
                        value={group.futureSalesSpeed}
                        style={{ width: '75px' }}
                        onChange={(target) => {
                          arraySalesSpeeds[i] = Number(target.value);
                          setTotal(getTotal(arraySalesSpeeds).toFixed(2));
                          futureSalesSpeedHandler(group.id, target.value);
                        }}
                      />
                    </div>
                  </Fragment>)
            : null}
          <div className={styles.gridItem} />
          <div className={styles.gridItem} />
          <div className={styles.gridItem} />
          <h4 className={styles.gridItem}>Total: </h4>
          <div className={styles.gridItem}>{total}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FutureSalesSpeed;
