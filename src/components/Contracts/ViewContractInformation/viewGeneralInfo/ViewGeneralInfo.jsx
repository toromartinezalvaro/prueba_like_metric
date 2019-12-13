/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import style from '../ViewContractInformation.module.scss';

const viewGeneralInfo = ({ contractDataView }) => {
  return (
    <Fragment>
      <div className={style.generalTitle}>
        <div className={`${style.circleIcon}  ${style.circleColorGeneral}`}>
          <Icon className={`${style.iconGeneral} fas fa-book-reader`} />
        </div>
        <h2>Información General</h2>
      </div>
      <Card className={style.card}>
        <CardContent>
          <div className={style.container}>
            <div className="leftInformation">
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>
                  <Icon className={`${style.prefixForTitle} fas fa-star`} />
                  TITULO DE CONTRATO
                </span>
                <p className={style.information}>{contractDataView.title}</p>
              </Card>
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>SOCIO DE NEGOCIOS</span>
                <p className={style.information}>
                  {contractDataView.businessPartner}
                </p>
              </Card>
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>GRUPO</span>
                <p className={style.information}>{contractDataView.group}</p>
              </Card>
              <Card className={style.leftTitle}>
                <span className={style.labelForTitle}>ITEM</span>
                <p className={style.information}>{contractDataView.item}</p>
              </Card>
            </div>
            <div className="rightInformation">
              <Card className={style.rightTitle}>
                <span className={style.labelForTitle}>ESTADO DEL CONTRATO</span>
                <p className={style.information}>{contractDataView.state}</p>
              </Card>
              <Card className={style.rightTitle}>
                <span className={style.labelForTitle}>NUMERO DE CONTRATO</span>
                <p className={style.information}>
                  {contractDataView.contractNumber}
                </p>
              </Card>
              <Card className={style.rightTitle}>
                <span className={style.labelForTitle}>
                  DECRIPCIÓN O COMENTARIO
                </span>
                <p className={style.information}>
                  {contractDataView.description}
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
