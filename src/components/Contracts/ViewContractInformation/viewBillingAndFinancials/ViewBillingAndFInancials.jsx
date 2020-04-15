/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import NumberFormat from 'react-number-format';
import Numbers from '../../../../helpers/numbers';
import style from '../ViewContractInformation.module.scss';

const ViewBillingAndFinancials = ({ contractDataView, events }) => {
  const totalBills = contractDataView.billings.reduce((a, b) => {
    const actualBill = (b.amount + b.amount * (b.iva / 100)) * b.paymentNumber;
    return a + actualBill;
  }, 0);
  const totalBillsWithouIVA = contractDataView.billings.reduce((a, b) => {
    return a + b.amount * b.paymentNumber;
  }, 0);
  return (
    <Fragment>
      <div className={style.generalTitle}>
        <div className={`${style.circleIcon}  ${style.circleColorFinantials}`}>
          <Icon className={`${style.icon} fas fa-tag`} />
        </div>
        <h2>Facturación y Finanzas</h2>
      </div>
      <Card className={style.card}>
        <CardContent>
          <div className={style.containerForBillings}>
            {contractDataView.billings.map((billing, i) => {
              return (
                <Card className={style.cardContainer} key={billing.id}>
                  <h3>Forma de pago N°{i + 1}</h3>
                  <div className={style.subContainer}>
                    <div className="leftInformation">
                      <Card className={style.leftTitle}>
                        <span className={style.labelForTitle}>
                          CICLO DE PAGO
                        </span>
                        <p className={style.information}>{billing.cycle}</p>
                      </Card>
                      <Card className={style.leftTitle}>
                        <span className={style.labelForTitle}>Evento</span>
                        <p className={style.information}>
                          {billing.eventId === 0 || billing.eventId === null
                            ? 'Evento elegido manualmente'
                            : events.find(
                                (element) => element.id === billing.eventId,
                              )}
                        </p>
                      </Card>
                      <Card className={style.leftTitle}>
                        <span className={style.cont}>
                          <span className={style.labelForTitle}>
                            VALOR DE CUENTA
                          </span>
                          <NumberFormat
                            value={Numbers.toFixed(billing.amount)}
                            displayType={'text'}
                            className={style.informationAmount}
                            thousandSeparator={true}
                            decimalSeparator={false}
                            prefix={'$'}
                          />
                        </span>
                      </Card>
                      <Card className={style.leftTitle}>
                        <span className={style.cont}>
                          <span className={style.labelForTitle}>
                            VALOR DE CUENTA CON IVA
                          </span>
                          <NumberFormat
                            value={
                              Numbers.toFixed(
                                billing.amount +
                                  billing.amount * (billing.iva / 100),
                              ) * Number(billing.paymentNumber)
                            }
                            displayType={'text'}
                            className={style.informationAmount}
                            thousandSeparator={true}
                            decimalSeparator={false}
                            prefix={'$'}
                          />
                        </span>
                      </Card>
                    </div>
                    <div className="rightInformation">
                      <Card className={style.rightTitle}>
                        <span className={style.labelForTitle}>
                          FECHA INICIAL DE COBRO
                        </span>
                        <p className={style.information}>
                          {billing.lastBillingDate
                            ? moment(Number(billing.initalBillingDate)).format(
                                'DD/MM/YYYY',
                              )
                            : 'FECHA CALENDARIO'}
                        </p>
                      </Card>
                      <Card className={style.rightTitle}>
                        <span className={style.labelForTitle}>
                          FECHA FINAL DE COBRO
                        </span>
                        <p className={style.information}>
                          {moment(Number(billing.lastBillingDate)).format(
                            'DD/MM/YYYY',
                          )}
                        </p>
                      </Card>
                      <Card className={style.rightTitle}>
                        <span className={style.labelForTitle}>DESCRIPCIÓN</span>
                        <p className={style.information}>
                          {billing.description}
                        </p>
                      </Card>
                      <Card className={style.rightTitle}>
                        <span className={style.labelForTitle}>IVA</span>
                        <p className={style.information}>
                          {billing.iva ? billing.iva : 0}%
                        </p>
                      </Card>
                    </div>
                  </div>
                </Card>
              );
            })}
            <div className={style.cardForm}>
              <div className={style.Totalbills}>
                <h4 sclassName={style.textTotal}> Valor Total Sin IVA:</h4>
                <NumberFormat
                  value={Numbers.toFixed(totalBillsWithouIVA)}
                  displayType="text"
                  className={style.totalAmount}
                  thousandSeparator
                  decimalSeparator={false}
                  prefix="$"
                />
              </div>
              <div className={style.Totalbills}>
                <h4 sclassName={style.textTotal}> Valor Total mas IVA:</h4>
                <NumberFormat
                  value={Numbers.toFixed(totalBills)}
                  displayType="text"
                  className={style.totalAmount}
                  thousandSeparator
                  prefix="$"
                  decimalSeparator={false}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
ViewBillingAndFinancials.propTypes = {
  contractDataView: PropTypes.object,
};

export default ViewBillingAndFinancials;
