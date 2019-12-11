/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import style from '../ViewContractInformation.module.scss';

const viewGeneralInfo = ({ contractDataView }) => {
  return (
    <Fragment>
      <div className={style.generalTitle}>
        <h2>Información General</h2>
      </div>
      <Card className={style.card}>
        <CardContent>
          <div className={style.container}>
            <div className="leftInformation">
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>Titulo de contrato</span>
                <p className={style.information}>{contractDataView.title}</p>
              </Card>
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>Socio de Negocios</span>
                <p className={style.information}>
                  {contractDataView.businessPartner}
                </p>
              </Card>
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>
                  Descripción o Comentario
                </span>
                <p className={style.information}>
                  {contractDataView.description}
                </p>
              </Card>
            </div>
            <div className="rightInformation">
              <Card className={style.rightTitle}>
                <span className={style.labelForTitle}>Estado del contrato</span>
                <p className={style.information}>{contractDataView.state}</p>
              </Card>
              <Card className={style.rightTitle}>
                <span className={style.labelForTitle}>Numero de contrato</span>
                <p className={style.information}>
                  {contractDataView.contractNumber}
                </p>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

viewGeneralInfo.propTypes = {
  contractDataView: PropTypes.object,
};

export default viewGeneralInfo;
