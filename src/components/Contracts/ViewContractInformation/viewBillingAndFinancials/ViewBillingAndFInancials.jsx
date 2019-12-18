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
import style from '../ViewContractInformation.module.scss';

const ViewBillingAndFinancials = ({ contractDataView }) => {
  const totalBills = contractDataView.billings.map((billing) => {
    let billingSum = 0;
    billingSum += Number(billing.amount);
    return billingSum;
  });
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
            {contractDataView.billings.map((billing) => {
              return (
                <Card className={style.cardContainer} key={billing.id}>
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
                        <p className={style.information}>{billing.eventId}</p>
                      </Card>
                      <Card className={style.leftTitle}>
                        <span className={style.labelForTitle}>
                          VALOR DE CUENTA
                        </span>
                        <p className={style.information}>
                          {billing.amount} COP
                        </p>
                      </Card>
                    </div>
                    <div className="rightInformation">
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
                    </div>
                  </div>
                </Card>
              );
            })}
            <div className={style.cardForm}>
              <div className={style.Totalbills}>
                <h4 sclassName={style.textTotal}> Valor Total:</h4>
                <p className={style.TotalAmount}>{totalBills} COP</p>
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
