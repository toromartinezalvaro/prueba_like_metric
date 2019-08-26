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
      <div className={Styles['def-price']}>
        Precio Promedio (Sin Adicionales)
      </div>
      <div className={Styles['def-price-m2']}>
        Precio m2 (Sin Adicionales)
      </div>
      <div className={Styles['def-increment-goal']}>
        Incremento Pesos (Meta)
      </div>
      <div className={Styles['def-sales-l0']}>Ventas L0 con adicionales</div>
      <div className={Styles['def-sales-future']}>Ventas Proyectadas</div>
      <div className={Styles['def-increment-base']}>Incremento / Base</div>
      <div className={Styles['def-analysis-inverse']}>Análisis Inverso</div>
      <div className={Styles['def-retention-months']}>
        Meses Retención de Inventario
      </div>
      <div className={Styles['def-ear']}>Tasas Incremento e.a</div>
      <div className={Styles['def-sales-wizard']}>Ayuda Ventas</div>
      <div className={Styles['def-inventory-retention']}>
        Meses Retención de Inventario
      </div>
      <div className={Styles['def-ear-suggestion']}>Tasas Incremento e.a</div>
      <div className={Styles['def-increment-goal-suggestion']}>
        Incremento Pesos (Meta)
      </div>
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
