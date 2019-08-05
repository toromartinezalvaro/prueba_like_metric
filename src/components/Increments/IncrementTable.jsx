import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import Card, { CardHeader, CardBody, CardFooter } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './IncrementTable.module.scss';
import variables from '../../assets/styles/variables.scss';
import GeneralInfo from './IncrementTable/GeneralInfo/GeneralInfo';
import SuggestedIncrement from './IncrementTable/SuggestedIncrement/SuggestedIncrement';
import Increments from './IncrementTable/Increments/Increments';
import AccordionTrigger from './IncrementTable/AccordionTrigger/AccordionTrigger';
import Definitions from './IncrementTable/Definitions/Definitions';
import Totals from './IncrementTable/Totals/Totals';

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
            key={`group-accordion-${i}`}
            trigger={<AccordionTrigger group={increment} />}
          >
            <div className={styles.AccordionContainer}>
              <GeneralInfo
                units={increment.units}
                averageArea={increment.averageArea}
                averagePrice={increment.averagePrice}
              />
              <div className={styles.incrementContainer}>
                <SuggestedIncrement
                  months={increment.salesSpeed}
                  effectiveAnnualInterestRate={
                    increment.anualEffectiveIncrement
                  }
                  increment={increment.suggestedIncrement}
                />
                <Increments
                  raised={increment.collectedIncrement}
                  toCollect={increment.increment - increment.collectedIncrement}
                  goal={increment.increment}
                />
              </div>
              <div className={styles.Button}>
                <Button>Calcular incremento</Button>
              </div>
            </div>
            <div className={styles['grid-container']}>
              <Definitions className={styles.definitions} />
              <Totals className={styles.total} />
              <div className="sold">
                <div className="sold-header" />
                <div className="sold-date" />
                <div className="sold-units" />
                <div className="sold-area" />
                <div className="sold-price" />
                <div className="sold-price-m2-addons" />
                <div className="sold-price-m2" />
                <div className="sold-increment-goal" />
                <div className="sold-sales-l0" />
                <div className="sold-sales-future" />
                <div className="sold-increment-base" />
                <div className="sold-analysis-inverse" />
                <div className="sold-retention-months" />
                <div className="sold-ear" />
                <div className="sold-sales-wizard" />
                <div className="sold-inventory-retention" />
                <div className="sold-ear-suggestion" />
                <div className="sold-increment-goal-suggestion" />
              </div>
              <div className="inventory">
                <div className="inv-header" />
                <div className="inv-date" />
                <div className="inv-units" />
                <div className="inv-area" />
                <div className="inv-price" />
                <div className="inv-price-m2-addons" />
                <div className="inv-price-m2" />
                <div className="inv-sales-l0" />
                <div className="inv-increment-goal" />
                <div className="inv-sales-future" />
                <div className="inv-increment-base" />
                <div className="inv-analysis-inverse" />
                <div className="inv-retention-months" />
                <div className="inv-ear" />
                <div className="inv-sales-wizard" />
                <div className="inv-inventory-retention" />
                <div className="inv-ear-suggestion" />
                <div className="inv-increment-goal-suggestion" />
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
