import React from 'react';
import Styles from './PropertyInfo.module.scss';

const PropertyInfo = () => {
  return (
    <div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Apartamento</span>
        </div>
        <div className={Styles.value}>
          <span>xxx</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Cuota inicial</span>
        </div>
        <div className={Styles.value}>
          <span>29%</span>
        </div>
        <div>
          <span>$108,000,000</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Separación</span>
        </div>
        <div className={Styles.value}>
          <span>1%</span>
        </div>
        <div>
          <span>$3,600,000</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Cuotas mensuales</span>
        </div>
        <div className={Styles.value}>
          <span>1%</span>
        </div>
        <div>
          <span>$3,600,000</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Pago final</span>
        </div>
        <div className={Styles.value}>
          <span>70%</span>
        </div>
        <div>
          <span>$252,000,000</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
