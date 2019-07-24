import React, { Fragment } from 'react';
import styles from './SummaryStrategy.module.scss';

const SummaryStrategy = props => {
  return (
    <div className={styles.Container}>
      <h2>Resumen</h2>
      <div>
        <div className={styles.ContainerFlex}>
          <h4 className={styles.gridItem}>Tipo</h4>
          <p className={styles.gridItem}>Unidades</p>
          <p className={styles.gridItem}>Frecuencia incremento</p>
          <p className={styles.gridItem}>Porcentaje de incremento</p>
          <p className={styles.gridItem}>Estrategia activa</p>
          {props.groups.map(group => (
            <Fragment>
              <h4 className={styles.gridItem}>{group.type}</h4>
              <p className={styles.gridItem}>{group.units}</p>
              <p className={styles.gridItem}>
                {group.strategy !== null ? group.strategy : 0}
              </p>
              <p className={styles.gridItem}>
                {(group.percentage * 100).toFixed(2)}%
              </p>
              <p className={styles.gridItem}>
                {group.strategy !== null ? props.helper.find(strategy => strategy.id === group.strategy).label : 'Sin estrategia'}{' '}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryStrategy;
