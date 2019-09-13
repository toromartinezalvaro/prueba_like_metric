import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import Card, { CardHeader, CardBody, CardFooter } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import Button from '../UI/Button/Button';
import styles from './IncrementTable.module.scss';
import AccordionTrigger from './IncrementTable/AccordionTrigger/AccordionTrigger';
import Definitions from './IncrementTable/Definitions/Definitions';
import Totals from './IncrementTable/Totals/Totals';
import Sales from './IncrementTable/Sales/Sales';
import Inventory from './IncrementTable/Inventory/Inventory';
import TotalIncrement from './IncrementTable/TotalIncrement/TotalIncrement';
import SalesWizard from './IncrementTable/SalesWizard';

function IncrementTable({
  data,
  putIncrement,
  putSalesSpeed,
  putSuggestedSalesSpeed,
  putSuggestedEffectiveAnnualInterestRate,
  towerId,
}) {
  const inputValidations = [
    {
      fn: (value) => value > 0,
      message: 'Los meses de retención deben ser mayores a 0',
    },
    {
      fn: (value) => value <= 98,
      message: 'Los meses de retención deben ser menores a 98',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <span>Incrementos</span>
      </CardHeader>
      <CardBody>
        <div>
          <span>Incremento total: </span>
          <NumberFormat
            value={data
              .reduce((current, group) => {
                return current + group.total.increment;
              }, 0)
              .toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>
        {data.map((group, i) => (
          <Accordion
            key={`group-accordion-${i}`}
            trigger={<AccordionTrigger group={group} />}
          >
            <div className={styles.AccordionContainer}>
              {group.total.date === null || group.inventory.date === null ? (
                <div>
                  <span>Primero se deben configurar las fechas</span>
                  <Link
                    to={`${DashboardRoutes.base}${DashboardRoutes.schedule.value}${towerId}`}
                  >
                    <Button>Ir a calendario</Button>
                  </Link>
                </div>
              ) : (
                <React.Fragment>
                  <div className={styles['grid-container']}>
                    <Definitions className={styles.definitions} />
                    <Totals
                      blockIncrements={group.total.units < 2}
                      className={styles.total}
                      groupSummary={group.total}
                      putIncrement={(increment) => {
                        putIncrement(
                          group.id,
                          increment,
                          group.inventory.units,
                          group.sales.increment,
                        );
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
                      blockIncrements={group.total.units < 2}
                      salesStartDate={group.total.date}
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
                              moment(),
                              'month',
                            ),
                          message:
                            'Los meses de retencion superan la fecha final de ventas',
                        },
                      ]}
                    />
                  </div>
                  <SalesWizard
                    data={group}
                    validations={[
                      ...inputValidations,
                      {
                        fn: (value) =>
                          value <=
                          moment(Number(group.sales.date)).diff(
                            moment(),
                            'month',
                          ),
                        message:
                          'Los meses de retencion superan la fecha final de ventas',
                      },
                    ]}
                    putSuggestedEffectiveAnnualInterestRate={(
                      effectiveAnnualInterestRate,
                    ) => {
                      putSuggestedEffectiveAnnualInterestRate(
                        group.id,
                        effectiveAnnualInterestRate,
                        i,
                      );
                    }}
                  />
                </React.Fragment>
              )}
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
  towerId: PropTypes.string,
};

IncrementTable.defaultProps = {
  data: [],
};

export default IncrementTable;
