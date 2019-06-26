import React from 'react';
import NumberFormat from 'react-number-format';
import Card, { CardHeader, CardBody, CardFooter } from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './IncrementTable.module.scss';

const incrementTable = ({
  data,
  salesSpeedsHandler,
  anualEffectiveIncrementsHandler,
  getPrices,
  ...rest
}) => {
  return (
    <Card>
      <CardHeader>
        <span>Incrementos</span>
      </CardHeader>
      <CardBody>
        <div className={styles.Content}>
          <div className={styles.Column}>
            <div className={styles.Header}>Tipo</div>
            {data.map(increment => {
              return <div>{increment.name}</div>;
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Unidades</div>
            {data.map(increment => {
              return <div>{increment.units}</div>;
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Area promedio</div>
            {data.map(increment => {
              return (
                <div>
                  <NumberFormat
                    value={parseFloat(increment.averageArea).toFixed(2)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=" m²"
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Precio Promedio</div>
            {data.map(increment => {
              return (
                <div>
                  <NumberFormat
                    value={parseFloat(increment.averagePrice).toFixed(2)}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={true}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Velocidad de ventas</div>
            <div>
              {data.map(increment => {
                return (
                  <div>
                    <Input
                      style={{ width: '50px' }}
                      validations={[]}
                      onChange={target => {
                        salesSpeedsHandler(increment.id, target.value);
                      }}
                      value={increment.salesSpeed}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Meta Var e.a</div>
            <div>
              {data.map(increment => {
                return (
                  <div>
                    <Input
                      style={{ width: '50px' }}
                      validations={[]}
                      onChange={target => {
                        anualEffectiveIncrementsHandler(
                          increment.id,
                          target.value,
                        );
                      }}
                      value={increment.anualEffectiveIncrement}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className={styles.ActionContainer}>
          <Button onClick={getPrices}>Calcular incrementos</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default incrementTable;
