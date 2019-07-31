import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import styles from './FutureSalesSpeed.module.scss';

const futureSalesSpeed = ({
  salesSpeeds,
  futureSalesSpeedHandler,
  ...rest
}) => {
  console.log(salesSpeeds.groups);
  const { groups } = salesSpeeds;
  console.log(salesSpeeds);
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
            ? groups.map(group => (
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
                  <div className={styles.gridItem}>
                    {group.averageArea.toFixed(2)}
                  </div>
                  <div className={styles.gridItem}>
                    <Input
                      validations={[]}
                      value={group.futureSalesSpeed}
                      style={{ width: '75px' }}
                      onChange={target => futureSalesSpeedHandler(group.id, target.value)}
                    />
                  </div>
                </Fragment>
            ))
            : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default futureSalesSpeed;
