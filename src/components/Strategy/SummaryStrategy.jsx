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
          {props.groups.map((group) => {
            averageValue += group.averageValue;
            units += group.units;
            averageMts2 += group.averageArea;
            futureSalesSpeed += group.futureSalesSpeed;
            incrementPercentage += group.percentage * 100;
            return (
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
                <p className={styles.gridItem}>
                  {group.averageArea.toFixed(2)}
                </p>
                <p className={styles.gridItem}>{group.futureSalesSpeed}</p>
                <p className={styles.gridItem}>
                  {group.strategy !== null ? group.strategy : 0}
                </p>
                <p className={styles.gridItem}>
                  {(group.percentage * 100).toFixed(2)}%
                </p>
                <p className={styles.gridItem}>
                  {group.strategy !== null
                    ? props.helper.find(
                        (strategy) => strategy.id === group.strategy,
                      ).label
                    : 'Sin estrategia'}{' '}
                </p>
              </Fragment>
            );
          })}
          <p className={styles.gridItem}>Total</p>
          <p className={styles.gridItem}>{units} </p>
          <p className={styles.gridItem}>
            <NumberFormat
              value={averageValue.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </p>
          <p className={styles.gridItem}>{averageMts2.toFixed(2)}</p>
          <p className={styles.gridItem}>{futureSalesSpeed}</p>
          <p className={styles.gridItem} />
          <p className={styles.gridItem}>{`${incrementPercentage.toFixed(
            2,
          )}%`}</p>
          <p className={styles.gridItem} />
        </div>
      </div>
    </div>
  );
};

export default SummaryStrategy;
