import React from 'react';
import Table from '../../components/UI/Table/Table';
import styles from './PropertiesTable.module.scss';

const PropertiesTables = props => {
  return (
    <div>
      <div className={styles.Container}>
        <div
          className={styles.GreenHelper}
        />
        <div className={styles.Label}>Disponible</div>
        <div
          className={styles.YellowHelper}
        />
        <div className={styles.Label}>Opcionado</div>
        <div
          className={styles.BlueHelper}
        />
        <div className={styles.Label}>Vendido</div>
      </div>
      <div>
        <Table
          intersect="Propiedades"
          headers={[...Array(props.properties).keys()].map(o => o + 1)}
          columns={[...Array(props.floors).keys()].map(
            o => o + props.lowestFloor
          )}
          data={props.data}
        />
      </div>
    </div>
  );
};

export default PropertiesTables;
