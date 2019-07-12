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
  getIncrements,
  incrementsHandler,
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
              return <div className={styles.Text}>{increment.name}</div>;
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Unidades</div>
            {data.map(increment => {
              return <div className={styles.Text}>{increment.units}</div>;
            })}
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Area promedio</div>
            {data.map(increment => {
              return (
                <div className={styles.Text}>
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
                <div className={styles.Text}>
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
                  <div className={styles.Text}>
                    <Input
                      style={{ width: '50px' }}
                      validations={[]}
                      onChange={target => {
                        salesSpeedsHandler(increment.id, target.value);
                      }}
                      value={
                        increment.salesSpeed === null
                          ? null
                          : increment.salesSpeed.toFixed(1)
                      }
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
                  <div className={styles.Text}>
                    <Input
                      mask="percentage"
                      style={{ width: '50px' }}
                      validations={[]}
                      onChange={target => {
                        anualEffectiveIncrementsHandler(
                          increment.id,
                          parseFloat(target.value) / 100,
                        );
                      }}
                      value={
                        increment.anualEffectiveIncrement === null
                          ? null
                          : (increment.anualEffectiveIncrement * 100).toFixed(1)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Incremento recaudado</div>
            <div>
              {data.map(increment => {
                return (
                  <div className={styles.Text}>
                    <NumberFormat
                      value={parseFloat(increment.collectedIncrement).toFixed(
                        2,
                      )}
                      displayType={'text'}
                      prefix={'$'}
                      thousandSeparator={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Incremento restante</div>
            <div>
              {data.map(increment => {
                return (
                  <div className={styles.Text}>
                    <NumberFormat
                      value={parseFloat(
                        increment.increment - increment.collectedIncrement,
                      ).toFixed(2)}
                      displayType={'text'}
                      prefix={'$'}
                      thousandSeparator={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.Column}>
            <div className={styles.Header}>Incremento</div>
            <div className={styles.Text}>
              {data.map(increment => {
                return increment.increment === null ? (
                  <div>-</div>
                ) : (
                  <div>
                    <Input
                      mask="currency"
                      style={{ width: '100px' }}
                      validations={[]}
                      onChange={target => {
                        incrementsHandler(increment.id, target.value);
                      }}
                      value={increment.increment.toFixed(2)}
                    />
                  </div>
                );
              })}
              <div className={styles.Header}>Incremento total</div>
              <div className={styles.Text}>
                <NumberFormat
                  value={data
                    .reduce((current, next) => {
                      return current + next.increment;
                    }, 0)
                    .toFixed(2)}
                  displayType={'text'}
                  prefix={'$'}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className={styles.ActionContainer}>
          <Button onClick={getIncrements}>Calcular incrementos</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default incrementTable;
