import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './styles.module.scss';

const General = ({ data }) => {
  return (
    <div className={Styles.container}>
      <div>
        <span className={Styles.header}>Tipo</span>
      </div>
      <div>
        <span className={Styles.header}>m² promedio</span>
      </div>
      <div>
        <span className={Styles.header}>Precio promedio</span>
      </div>
      <div>
        <div>
          <span className={Styles.header}>Vendido</span>
        </div>
        <div className={Styles.combinedHeader}>
          <span className={Styles.subHeader}>Unidades</span>
          <span className={Styles.subHeader}>$</span>
        </div>
      </div>
      <div>
        <div>
          <span className={Styles.header}>Proyectado</span>
        </div>
        <div className={Styles.combinedHeader}>
          <span className={Styles.subHeader}>Unidades</span>
          <span className={Styles.subHeader}>$</span>
        </div>
      </div>
      <div>
        <div>
          <span className={Styles.header}>Total Ventas</span>
        </div>
        <div className={Styles.combinedHeader}>
          <span className={Styles.subHeader}>Unidades</span>
          <span className={Styles.subHeader}>$</span>
        </div>
      </div>
      <div>
        <span className={Styles.header}>Descuentos financieros</span>
      </div>
      <div>
        <span className={Styles.header}>Ingresos totales</span>
      </div>
      {data.map((group, i) => (
        <Fragment key={`GeneralRow${i}`}>
          <div>
            <span>{group.name}</span>
          </div>
          <div>
            <NumberFormat
              thousandSeparator=","
              suffix="m²"
              value={group.averageArea.toFixed(2)}
              displayType="text"
            />
          </div>
          <div>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={group.averagePrice.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.combinedRow}>
            <span className={Styles.subRow}>{group.sold.units}</span>
            <NumberFormat
              className={Styles.subRow}
              thousandSeparator=","
              prefix="$"
              value={group.sold.balance.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.combinedRow}>
            <span className={Styles.subRow}>{group.inventory.units}</span>
            <NumberFormat
              className={Styles.subRow}
              thousandSeparator=","
              prefix="$"
              value={group.inventory.balance.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.combinedRow}>
            <span className={Styles.subRow}>{group.total.units}</span>
            <NumberFormat
              className={Styles.subRow}
              thousandSeparator=","
              prefix="$"
              value={group.total.balance.toFixed(2)}
              displayType="text"
            />
          </div>
          <div>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={group.discounts.toFixed(2)}
              displayType="text"
            />
          </div>
          <div>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={group.balance.toFixed(2)}
              displayType="text"
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

General.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      averageArea: PropTypes.number,
      averagePrice: PropTypes.number,
      sold: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      inventory: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      total: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      discounts: PropTypes.number,
      balance: PropTypes.number,
    }),
  ),
};

General.defaultProps = {
  data: [],
};

export default memo(General);
