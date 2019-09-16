import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  RadioButton,
  ReversedRadioButton,
} from 'react-radio-buttons';
import NumberFormat from 'react-number-format';
import Input from '../../UI/Input/Input';
import Styles from './styles.module.scss';
import StyleVariables from '../../../assets/styles/variables.scss';

const SalesRoomModal = ({ property, discount, tradeDiscount }) => {
  const { status, price, priceSold } = property;

  const [currentState, setCurrentState] = useState(status);
  const [currentDiscount, setCurrentDiscount] = useState(
    discount === null ? 0 : discount,
  );
  const [currentTradeDiscount, setCurrentTradeDiscount] = useState(
    tradeDiscount === null ? 0 : tradeDiscount,
  );
  const [discountState, setDiscountState] = useState(
    discount === null || discount >= 0 ? 'DISCOUNT' : 'INCREMENT',
  );
  const [tradeDiscountState, setTradeDiscountState] = useState(
    tradeDiscount === null || tradeDiscount >= 0 ? 'DISCOUNT' : 'INCREMENT',
  );

  const getTradePrice = () => {
    return priceSold !== null
      ? parseFloat(priceSold + discount - currentDiscount).toFixed(2)
      : price.toFixed(2) - currentDiscount;
  };

  const getFinalTradePrice = () => {
    return priceSold !== null
      ? parseFloat(
          priceSold + discount - currentDiscount - currentTradeDiscount,
        ).toFixed(2)
      : price.toFixed(2) - currentDiscount - currentTradeDiscount;
  };

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
                  priceSold === null
                    ? price.toFixed(2)
                    : parseFloat(priceSold + discount).toFixed(2)
                }
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </div>
          </div>
          <div className={Styles.inputContainer}>
            <div className={Styles.row}>
              <div>
                <RadioGroup
                  value={discountState}
                  onChange={(value) => {
                    setCurrentDiscount(currentDiscount * -1);
                    setDiscountState(value);
                  }}
                  horizontal
                >
                  <ReversedRadioButton
                    value="DISCOUNT"
                    pointColor={StyleVariables.greenColor}
                  >
                    Descuento
                  </ReversedRadioButton>
                  <ReversedRadioButton
                    value="INCREMENT"
                    pointColor={StyleVariables.redColor}
                  >
                    Incremento
                  </ReversedRadioButton>
                </RadioGroup>
              </div>
              <div className={Styles.label}>
                <span>Comercial</span>
              </div>
            </div>
            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={(target) => {
                setCurrentDiscount(
                  discountState === 'DISCOUNT'
                    ? target.value
                    : target.value * -1,
                );
              }}
              value={Math.abs(currentDiscount)}
            />
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>Valor de Cierre Comercial</span>
            <NumberFormat
              value={getTradePrice()}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </div>
          <div className={Styles.inputContainer}>
            <div className={Styles.row}>
              <div>
                <RadioGroup
                  value={tradeDiscountState}
                  onChange={(value) => {
                    setCurrentTradeDiscount(currentTradeDiscount * -1);
                    setTradeDiscountState(value);
                  }}
                  horizontal
                >
                  <ReversedRadioButton
                    value="DISCOUNT"
                    pointColor={StyleVariables.greenColor}
                  >
                    Descuento
                  </ReversedRadioButton>
                  <ReversedRadioButton
                    value="INCREMENT"
                    pointColor={StyleVariables.redColor}
                  >
                    Incremento
                  </ReversedRadioButton>
                </RadioGroup>
              </div>
              <div className={Styles.label}>
                <span>Financiero</span>
              </div>
            </div>

            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={(target) => {
                setCurrentTradeDiscount(
                  tradeDiscountState === 'DISCOUNT'
                    ? target.value
                    : target.value * -1,
                );
              }}
              value={Math.abs(currentTradeDiscount)}
            />
          </div>
          <div className={Styles.inputContainer}>
            <span className={Styles.label}>Valor de Cierre Negocio</span>
            <NumberFormat
              value={getFinalTradePrice()}
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
