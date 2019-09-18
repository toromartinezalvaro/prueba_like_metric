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

const SalesRoomModal = ({ property, onChange }) => {
  const { status, price, priceSold, discount, tradeDiscount } = property;

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
      <div className={Styles.status}>
        <RadioGroup
          value={currentState}
          onChange={(value) => {
            onChange('status', value);
            setCurrentState(value);
          }}
          horizontal
        >
          <RadioButton value="AVAILABLE">Disponible</RadioButton>
          <RadioButton value="OPTIONAL">Opcionado</RadioButton>
          <RadioButton value="SOLD">Vendido</RadioButton>
        </RadioGroup>
      </div>
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
          <div className={Styles.dividedInputContainer}>
            <div className={Styles.row}>
              <div className={Styles.label}>
                <span>Comercial</span>
              </div>
              <div>
                <RadioGroup
                  value={discountState}
                  onChange={(value) => {
                    const changedCurrentDiscount = currentDiscount * -1;
                    onChange('discount', changedCurrentDiscount);
                    setCurrentDiscount(changedCurrentDiscount);
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
            </div>
            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={(target) => {
                const calculatedDiscount =
                  discountState === 'DISCOUNT'
                    ? target.value
                    : target.value * -1;
                onChange('discount', calculatedDiscount);
                setCurrentDiscount(calculatedDiscount);
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
          <div className={Styles.dividedInputContainer}>
            <div className={Styles.row}>
              <div className={Styles.label}>
                <span>Financiero</span>
              </div>
              <div>
                <RadioGroup
                  value={tradeDiscountState}
                  onChange={(value) => {
                    const changedCurrentTradeDiscount =
                      currentTradeDiscount * -1;
                    onChange('tradeDiscount', changedCurrentTradeDiscount);
                    setCurrentTradeDiscount(changedCurrentTradeDiscount);
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
            </div>

            <Input
              mask="currency"
              className={Styles.input}
              validations={[]}
              onChange={(target) => {
                const calculatedCurrentTradeDiscount =
                  tradeDiscountState === 'DISCOUNT'
                    ? target.value
                    : target.value * -1;
                onChange('tradeDiscount', calculatedCurrentTradeDiscount);
                setCurrentTradeDiscount(calculatedCurrentTradeDiscount);
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
