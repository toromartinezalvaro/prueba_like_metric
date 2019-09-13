import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import NumberFormat from 'react-number-format';
import Input from '../../UI/Input/Input';
import Styles from './styles.module.scss';

const SalesRoomModal = ({ property }) => {
  const { status, price, priceSold } = property;

  const [currentState, setCurrentState] = useState(status);

  return (
    <div>
      <RadioGroup
        value={currentState}
        onChange={(value) => {
          setCurrentState(value);
        }}
        horizontal
      >
        <RadioButton value="AVAILABLE">Disponible</RadioButton>
        <RadioButton value="OPTIONAL">Opcionado</RadioButton>
        <RadioButton value="SOLD">Vendido</RadioButton>
      </RadioGroup>
      {currentState === 'AVAILABLE' ? null : (
        <div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>Valor de venta</span>
            <div>
              <NumberFormat
                value={
                  priceSold === null ? price.toFixed(2) : priceSold.toFixed(2)
                }
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </div>
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>
              Descuento / Incremento Comercial
            </span>
            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={() => null}
            />
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>Valor de Cierre Comercial</span>
            <NumberFormat
              value={
                priceSold !== null ? priceSold.toFixed(2) : price.toFixed(2)
              }
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>
              Descuento Financiero / Financiación
            </span>
            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={() => null}
            />
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>Valor de Cierre Negocio</span>
            <NumberFormat
              value={
                priceSold !== null ? priceSold.toFixed(2) : price.toFixed(2)
              }
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </div>
        </div>
      )}
    </div>
  );
};

SalesRoomModal.propTypes = {
  propertyState: PropTypes.any,
};

export default SalesRoomModal;
