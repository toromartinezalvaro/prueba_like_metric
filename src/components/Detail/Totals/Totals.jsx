import React from 'react';
import styles from '../Totals/Totals.module.scss';
import NumberFormat from 'react-number-format';

const totals = props => {
  return (
    <div className={styles.Container}>
      <div>
        <strong>Inmueble: </strong>
        <NumberFormat
          value={props.data.totals.priceArea}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div>
        <strong>Adicionales: </strong>
        <NumberFormat
          value={props.data.totals.priceAdditional}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div>
        <strong>Total: </strong>
        <NumberFormat
          value={props.data.totals.priceWithAdditional}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div>
        <strong>Area total: </strong>
        <p>{Number(props.data.totals.mts2.toFixed(3)) + ' mts2 '}</p>
      </div>
      <div>
        <strong>Valor por mt2: </strong>
        <NumberFormat
          value={props.data.totals.priceXMts2WithoutAdditional}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div>
        <strong>Valor por mt2 + adicionales: </strong>
        <NumberFormat
          value={props.data.totals.priceXMts2}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
    </div>
  );
};

export default totals;
