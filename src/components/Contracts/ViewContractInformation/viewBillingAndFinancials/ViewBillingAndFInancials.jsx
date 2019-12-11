/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import style from '../ViewContractInformation.module.scss';

const ViewBillingAndFinancials = ({ contractDataView }) => {
  return (
    <Fragment>
      <div className={style.generalTitle}>
        <h2>Facturación y Finanzas</h2>
      </div>
      <Card className={style.card}>
        <CardContent>
          <div className={style.container}>
            {contractDataView.billings.map((billing, i) => {
              return (
                <div className={style.subContainer} key={billing.id}>
                  <div className="leftInformation">
                    <Card className={style.leftTitle}>
                      <span className={style.labelForTitle}>Ciclo de pago</span>
                      <p className={style.information}>{billing.cycle}</p>
                    </Card>
                    <Card className={style.leftTitle}>
                      <span className={style.labelForTitle}>Evento</span>
                      <p className={style.information}>{billing.eventId}</p>
                    </Card>
                    <Card className={style.leftTitle}>
                      <span className={style.labelForTitle}>
                        Valor de cuenta
                      </span>
                      <p className={style.information}>{billing.amount}</p>
                    </Card>
                  </div>
                  <div className="rightInformation">
                    <Card className={style.rightTitle}>
                      <span className={style.labelForTitle}>
                        Fecha final de cobro
                      </span>
                      <p className={style.information}>
                        {billing.lastBillingDate}
                      </p>
                    </Card>
                    <Card className={style.rightTitle}>
                      <span className={style.labelForTitle}>description</span>
                      <p className={style.information}>{billing.description}</p>
                    </Card>
                  </div>
                </div>
              );
            })}
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
