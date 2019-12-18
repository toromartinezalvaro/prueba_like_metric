import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Definitions.module.scss';

function Definitions({ className }) {
  return (
    <div className={`${Styles.definitions} ${className}`}>
      <div className={Styles['def-header']}>
        Definición de la Meta de Incrementos
      </div>
      <div className={Styles['def-date']}>Fecha</div>
      <div className={Styles['def-units']}>Unidades</div>
      <div className={Styles['def-area']}>Área Promedio</div>
      <div className={Styles['def-price']}>Precio Promedio L0</div>
      <div className={Styles['def-price-m2']}>Precio m2</div>
      <div className={Styles['def-increment-goal']}>
        Incremento Pesos (Meta)
      </div>
      <div className={Styles['def-sales-l0']}>Ventas L0 </div>
      <div className={Styles['def-sales-future']}>Ventas</div>
      <div className={Styles['def-sales-average']}>Promedio de ventas m2</div>
      <div className={Styles['def-increment-base']}>Incremento / Base</div>
      <div className={Styles['def-analysis-inverse']}>Análisis Inverso</div>
      <div className={Styles['def-inventory-base-price-mt2']}>
        Precio base de inventario m2
      </div>
      <div className={Styles['def-inventory-base-price']}>
        Precio base de inventario
      </div>
      <div className={Styles['def-sales-speed']}>Velocidad de ventas</div>
      <div className={Styles['def-retention-months']}>
        Meses Retención de Inventario
      </div>
      <div className={Styles['def-ear']}>Tasas Incremento e.a</div>
    </div>
  );
}

Definitions.propTypes = {
  className: PropTypes.string,
};

Definitions.defaultProps = {
  className: '',
};

export default Definitions;
