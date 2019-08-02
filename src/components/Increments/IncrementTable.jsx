import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import Card, { CardHeader, CardBody, CardFooter } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './IncrementTable.module.scss';
import variables from '../../assets/styles/variables.scss';
import GeneralInfo from '../Increments/IncrementTable/GeneralInfo';

let arrayOfIncrements = [];

const IncrementTable = ({
  data,
  salesSpeedsHandler,
  anualEffectiveIncrementsHandler,
  getIncrements,
  incrementsHandler,
  isLoadingIncrement,
  isEmpty,
  ...rest
}) => {
  const [validation, setValidation] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const inputValidation = (units) => [
    {
      fn: (value) => value > 0,
      message: 'La velocidad de ventas debe ser mayor a 0',
    },
    {
      fn: (value) => value <= units,
      message: 'Debe ser menor a las unidades',
    },
    {
      fn: (value) => units / value <= 98,
      message:
        'La velocidad de ventas es demasiado baja para el numero de unidades',
    },
  ];

  if (arrayOfIncrements.length === 0) {
    arrayOfIncrements = data.map((increment) => [
      increment.salesSpeed,
      increment.anualEffectiveIncrement,
    ]);
  }

  return (
    <Card>
      <CardHeader>
        <span>Incrementos</span>
      </CardHeader>
      <CardBody>
        {data.map((increment, i) => (
          <Accordion
            key={`group-accordion ${i}`}
            trigger={
              <div>
                {increment.name}
                {increment.increment !== null ? (
                  <NumberFormat
                    value={increment.increment.toFixed(2)}
                    displayType={'text'}
                    prefix=" - $"
                    thousandSeparator={true}
                  />
                ) : null}
              </div>
            }
          >
            <div className={styles.AccordionContainer}>
              <GeneralInfo />
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Unidades:</span>
                </div>
                <div>{increment.units}</div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Area Promedio:</span>
                </div>
                <div>
                  <NumberFormat
                    value={parseFloat(increment.averageArea).toFixed(2)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=" m²"
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>
                    Precio Promedio (Sin primas):
                  </span>
                </div>
                <div>
                  <NumberFormat
                    value={parseFloat(increment.averagePrice).toFixed(2)}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Velocidad de ventas:</span>
                </div>
                <div>
                  <Input
                    style={{ width: '50px' }}
                    validations={inputValidation(increment.units)}
                    onChange={(target) => {
                      salesSpeedsHandler(increment.id, target.value);
                      arrayOfIncrements[i][0] = target.value;
                      setValidation(
                        arrayOfIncrements.find(
                          (increment) =>
                            increment[0] === null || increment[1] === null,
                        ),
                      );
                    }}
                    value={
                      increment.salesSpeed === null
                        ? null
                        : increment.salesSpeed.toFixed(1)
                    }
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Meta Var e.a:</span>
                </div>
                <div>
                  <Input
                    mask="percentage"
                    style={{ width: '50px' }}
                    validations={[]}
                    onChange={(target) => {
                      anualEffectiveIncrementsHandler(
                        increment.id,
                        parseFloat(target.value) / 100,
                      );
                      arrayOfIncrements[i][1] = target.value;
                      setValidation(
                        arrayOfIncrements.find(
                          (increment) =>
                            increment[0] === null || increment[1] === null,
                        ),
                      );
                    }}
                    value={
                      increment.anualEffectiveIncrement === null
                        ? null
                        : (increment.anualEffectiveIncrement * 100).toFixed(1)
                    }
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Incremento sugerido:</span>
                </div>
                <div>
                  <NumberFormat
                    value={parseFloat(increment.suggestedIncrement).toFixed(2)}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={true}
                  />
                </div>
              </div>

              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Incremento recaudado:</span>
                </div>
                <div>
                  <NumberFormat
                    value={parseFloat(increment.collectedIncrement).toFixed(2)}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  <span className={styles.label}>Incremento restante:</span>
                </div>
                <div>
                  <NumberFormat
                    value={parseFloat(
                      increment.increment - increment.collectedIncrement,
                    ).toFixed(2)}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator={true}
                  />
                </div>
              </div>
              <div className={styles.statContent}>
                <div>
                  {' '}
                  <span className={styles.label}>Meta incremento:</span>
                </div>
                <div>
                  <div>
                    <Input
                      mask="currency"
                      style={{ width: '100px' }}
                      validations={[]}
                      onChange={(target) => {
                        incrementsHandler(increment.id, target.value);
                      }}
                      value={
                        increment.increment === null
                          ? null
                          : increment.increment.toFixed(2)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
        ))}
        Incremento total:{' '}
        <NumberFormat
          value={data
            .reduce((current, next) => current + next.increment, 0)
            .toFixed(2)}
          displayType={'text'}
          prefix={'$'}
          thousandSeparator={true}
        />
      </CardBody>
      <CardFooter>
        {validation && isClicked ? (
          <div
            style={{ display: 'flex', justifyContent: 'center', color: 'red' }}
          >
            <p>
              Debe ingresar todos los campos para poder realizar el incremento
            </p>
          </div>
        ) : null}
        <div className={styles.ActionContainer}>
          <div style={{ width: '20%' }} />
          {isLoadingIncrement ? (
            <Loader
              type="ThreeDots"
              color={variables.mainColor}
              height="50"
              width="50"
            />
          ) : null}
          <div
            onClick={() => {
              setValidation(
                arrayOfIncrements.find(
                  (increment) => increment[0] === null || increment[1] === null,
                ),
              );
              setIsClicked(true);
            }}
          >
            <div className={styles.Button}>
              {validation ? (
                <Button>Calcular incrementos</Button>
              ) : (
                <Button onClick={getIncrements}>Calcular incrementos</Button>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncrementTable;
