import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import styles from './SummaryStrategy.module.scss';

const SummaryStrategy = (props) => {
  let averageValue = 0;
  let units = 0;
  let averageMts2 = 0;
  let futureSalesSpeed = 0;
  let incrementPercentage = 0;
  return (
    <div className={styles.Container}>
      <h2 className={styles.h2}>Resumen</h2>
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
          {props.groups.map((group) => {
            averageValue += group.averageValue * group.units;
            units += group.units;
            averageMts2 += group.averageArea * group.units;
            futureSalesSpeed += group.futureSalesSpeed;
            incrementPercentage += group.percentage * 100;
            return (
              <Fragment key={`Fragment ${group.id}`}>
                <p className={styles.gridItem}>{group.type.slice(5)}</p>
                <p className={styles.gridItem}>{group.units}</p>
                <p className={styles.gridItem}>
                  <NumberFormat
                    value={
                      group.averageValue ? group.averageValue.toFixed(2) : 0
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </p>
                <p className={styles.gridItem}>
                  {group.averageArea.toFixed(2)}
                </p>
                <p className={styles.gridItem}>{group.futureSalesSpeed}</p>
                <p className={styles.gridItem}>
                  {group.strategy !== null && !group.isReset
                    ? group.strategy
                    : 0}
                </p>
                <p className={styles.gridItem}>
                  {!group.isReset
                    ? `${(group.percentage * 100).toFixed(2)}%`
                    : '0%'}
                </p>
                <p className={styles.gridItem}>
                  {group.strategy !== null
                    ? props.helper.find(
                        (strategy) => strategy.id === group.strategy,
                      ).label
                    : 'Sin estrategia'}
                </p>
              </Fragment>
            );
          })}
          <p className={styles.gridItem}>Total/Prom</p>
          <p className={styles.gridItem}>{units} </p>
          <p className={styles.gridItem}>
            <NumberFormat
              value={(averageValue / units).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </p>
          <p className={styles.gridItem}>{(averageMts2 / units).toFixed(2)}</p>
          <p className={styles.gridItem}>{futureSalesSpeed.toFixed(2)}</p>
          <p className={styles.gridItem} />
          <p className={styles.gridItem}></p>
          <p className={styles.gridItem} />
        </div>
      </div>
    </div>
  );
};

export default SummaryStrategy;
