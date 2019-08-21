import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card, { CardHeader, CardBody, CardFooter } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import styles from './IncrementTable.module.scss';
import AccordionTrigger from './IncrementTable/AccordionTrigger/AccordionTrigger';
import Definitions from './IncrementTable/Definitions/Definitions';
import Totals from './IncrementTable/Totals/Totals';
import Sales from './IncrementTable/Sales/Sales';
import Inventory from './IncrementTable/Inventory/Inventory';
import TotalIncrement from './IncrementTable/TotalIncrement/TotalIncrement';

function IncrementTable({
  data,
  putIncrement,
  putSalesSpeed,
  putSuggestedSalesSpeed,
  putSuggestedEffectiveAnnualInterestRate,
}) {
  const inputValidations = [
    {
      fn: (value) => value > 0,
      message: 'Los meses de retención deben ser mayores a 0',
    },
    {
      fn: (value) => value <= 98,
      message: 'Los meses de retención deben ser menores a 98 }',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <span>Incrementos</span>
      </CardHeader>
      <CardBody>
        {data.map((group, i) => (
          <Accordion
            key={`group-accordion-${i}`}
            trigger={<AccordionTrigger group={group} />}
          >
            <div className={styles.AccordionContainer}>
              <div className={styles['grid-container']}>
                <Definitions className={styles.definitions} />
                <Totals
                  blockIncrements={group.total.units === 1}
                  className={styles.total}
                  groupSummary={group.total}
                  putIncrement={(increment) => {
                    putIncrement(group.id, increment, i);
                  }}
                  putSalesSpeed={(retentionMonths) => {
                    putSalesSpeed(group.id, retentionMonths, i);
                  }}
                  validations={[
                    ...inputValidations,
                    {
                      fn: (value) =>
                        value <=
                        moment(Number(group.sales.date)).diff(
                          moment(Number(group.total.date)),
                          'month',
                        ),
                      message:
                        'Los meses de retencion superan la fecha final de ventas',
                    },
                  ]}
                />
                <Sales className={styles.sold} groupSummary={group.sales} />
                <Inventory
                  blockIncrements={group.total.units === 1}
                  className={styles.inventory}
                  groupSummary={group.inventory}
                  putSuggestedSalesSpeed={(retentionMonths) => {
                    putSuggestedSalesSpeed(group.id, retentionMonths, i);
                  }}
                  putSuggestedEffectiveAnnualInterestRate={(
                    effectiveAnnualInterestRate,
                  ) => {
                    putSuggestedEffectiveAnnualInterestRate(
                      group.id,
                      effectiveAnnualInterestRate,
                      i,
                    );
                  }}
                  validations={[
                    ...inputValidations,
                    {
                      fn: (value) =>
                        value <=
                        moment(Number(group.sales.date)).diff(
                          moment(Number(group.total.date)),
                          'month',
                        ),
                      message:
                        'Los meses de retencion superan la fecha final de ventas',
                    },
                  ]}
                />
              </div>
            </div>
          </Accordion>
        ))}
        {/* <TotalIncrement totalIncrement={data} /> Cambiar modo de calcular los incrementos totales */}
      </CardBody>
      <CardFooter />
    </Card>
  );
}

IncrementTable.propTypes = {
  data: PropTypes.array,
  putIncrement: PropTypes.func.isRequired,
  putSalesSpeed: PropTypes.func.isRequired,
  putSuggestedSalesSpeed: PropTypes.func.isRequired,
  putSuggestedEffectiveAnnualInterestRate: PropTypes.func.isRequired,
};

IncrementTable.defaultProps = {
  data: [],
};

export default IncrementTable;
