import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import styles from './SummaryStrategy.module.scss';

const SummaryStrategy = props => (
  <div className={styles.Container}>
    <h2>Resumen</h2>
    <div>
      <div className={styles.ContainerFlex}>
        <h4 className={styles.gridItem}>Tipo</h4>
        <h4 className={styles.gridItem}>Unidades</h4>
        <h4 className={styles.gridItem}>Valor prom</h4>
        <h4 className={styles.gridItem}>m² prom</h4>
        <h4 className={styles.gridItem}>Velocidad ventas futura</h4>
        <h4 className={styles.gridItem}>Frecuencia incremento</h4>
        <h4 className={styles.gridItem}>% incremento</h4>
        <h4 className={styles.gridItem}>Estrategia activa</h4>
        {props.groups.map(group => (
          <Fragment key={`Fragment ${group.id}`}>
            <p className={styles.gridItem}>{group.type.slice(5)}</p>
            <p className={styles.gridItem}>{group.units}</p>
            <p className={styles.gridItem}>
              <NumberFormat
                value={group.averageValue.toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </p>
            <p className={styles.gridItem}>{group.averageArea.toFixed(2)}</p>
            <p className={styles.gridItem}>{group.futureSalesSpeed}</p>
            <p className={styles.gridItem}>
              {group.strategy !== null ? group.strategy : 0}
            </p>
            <p className={styles.gridItem}>
              {(group.percentage * 100).toFixed(2)}%
            </p>
            <p className={styles.gridItem}>
              {group.strategy !== null
                ? props.helper.find(strategy => strategy.id === group.strategy)
                    .label
                : 'Sin estrategia'}{' '}
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default SummaryStrategy;
