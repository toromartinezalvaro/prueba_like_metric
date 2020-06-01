import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  RadioButton,
  ReversedRadioButton,
} from 'react-radio-buttons';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import 'moment/locale/es';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '../../UI/Input/Input';
import Styles from './styles.module.scss';
import StyleVariables from '../../../assets/styles/variables.scss';
import SalesRoomEnum from '../../../containers/SalesRoom/SalesRoom.enum';
import AdditionalAreas from './AdditionalAreas';
import QuotationDialog from '../../Quotations/Dialog';
import FinancialDialog from '../../Financial/Dialog';
import RequestStatus from '../../../helpers/requestStatus';

// Internal constants definitions
const DISCOUNT = 'DISCOUNT';
const INCREMENT = 'INCREMENT';

const SalesRoomModal = ({
  isLast,
  property,
  onChange,
  clientId,
  deadlineDate,
  onChangeDeadlineDate,
  additionalAreas,
  addAdditionalAreaHandler,
  deleteAdditionalAreaHandler,
  towerId,
  spawnMessage,
  optionalDescript,
  optionalDescription,
  isSavingErrorActive,
  updateInitialStatus,
}) => {
  const {
    status,
    priceWithIncrement,
    priceSold,
    discount,
    tradeDiscount,
    price,
    addedAdditionalAreas,
    adminAdditionalAreas,
    optionalDescriptions,
  } = property;

  const [initialStatus, setInitialStatus] = useState(null);
  useEffect(() => {
    setInitialStatus(status);
    updateInitialStatus();
  }, []);

  const [quotationOpen, setQuotationOpen] = useState(false);
  const [optionalTextDescript, setOptionalTextDescript] = useState('');
  const [fixedPrice, setFixed] = useState(
    priceSold !== null
      ? (parseFloat(priceSold) + parseFloat(discount || 0)).toFixed(2)
      : priceWithIncrement.toFixed(2),
  );

  const reduceAdditionalAreas = (array) => {
    return array.reduce((c, n) => {
      return c + n.unitPrice;
    }, 0);
  };

  const [additionalPrices, setAdditionalPrices] = useState(
    reduceAdditionalAreas(addedAdditionalAreas) +
      reduceAdditionalAreas(adminAdditionalAreas),
  );
  const [currentState, setCurrentState] = useState(status);
  const [currentDiscount, setCurrentDiscount] = useState(discount || 0);
  const [currentTradeDiscount, setCurrentTradeDiscount] = useState(
    tradeDiscount === null ? 0 : tradeDiscount,
  );
  const [discountState, setDiscountState] = useState(
    discount === null || discount >= 0 ? DISCOUNT : INCREMENT,
  );
  const [tradeDiscountState, setTradeDiscountState] = useState(
    tradeDiscount === null || tradeDiscount >= 0 ? DISCOUNT : INCREMENT,
  );

  const getTradePrice = () => {
    return (fixedPrice - currentDiscount + additionalPrices).toFixed(2);
  };

  const getFinalTradePrice = () => {
    return (
      fixedPrice -
      currentDiscount -
      currentTradeDiscount +
      additionalPrices
    ).toFixed(2);
  };
  const setAdditionalPricesHandler = () => {
    setAdditionalPrices(
      reduceAdditionalAreas(addedAdditionalAreas) +
        reduceAdditionalAreas(adminAdditionalAreas),
    );
  };

  useEffect(() => {
    setFixed(priceWithIncrement.toFixed(2));
  }, [priceWithIncrement]);

  useEffect(() => {
    setOptionalTextDescript(optionalDescriptions);
    setAdditionalPrices(
      reduceAdditionalAreas(addedAdditionalAreas) +
        reduceAdditionalAreas(adminAdditionalAreas),
    );
  });

  const requestStatusValidation = (status) => {
    switch (status) {
      case SalesRoomEnum.status.AVAILABLE:
        return false;
      case SalesRoomEnum.status.OPTIONAL:
        return (
          property.requestStatus === RequestStatus.DISMISSED ||
          (isLast && currentState !== SalesRoomEnum.status.AVAILABLE)
        );
      case SalesRoomEnum.status.SOLD:
        return (
          property.requestStatus === RequestStatus.DISMISSED ||
          (isLast && currentState !== SalesRoomEnum.status.AVAILABLE)
        );
      default:
        return true;
    }
  };

  return (
    <>
      <div>
        <div className={Styles.status}>
          {isSavingErrorActive && (
            <Typography variant="subtitle1" color="error" align="center">
              {
                '* No es posible realizar esta acción, el grupo actual no tiene estrategias'
              }
            </Typography>
          )}
          {(property.clientId === clientId || property.clientId === null) && (
            <RadioGroup
              value={currentState}
              onChange={(value) => {
                onChange('status', value);
                setCurrentState(value);
              }}
              horizontal
            >
              <RadioButton
                value={SalesRoomEnum.status.AVAILABLE}
                disabled={requestStatusValidation(
                  SalesRoomEnum.status.AVAILABLE,
                )}
              >
                Disponible
              </RadioButton>
              <RadioButton
                value={SalesRoomEnum.status.OPTIONAL}
                disabled={requestStatusValidation(
                  SalesRoomEnum.status.OPTIONAL,
                )}
              >
                Opcionado
              </RadioButton>
              <RadioButton
                value={SalesRoomEnum.status.SOLD}
                disabled={requestStatusValidation(SalesRoomEnum.status.SOLD)}
              >
                Vendido
              </RadioButton>
            </RadioGroup>
          )}
        </div>
        {currentState === SalesRoomEnum.status.OPTIONAL && (
          <div>
            <div className={Styles.inputContainer}>
              Seleccione la fecha de vencimiento:
            </div>
            <div className={Styles.DateTimePicker}>
              <MuiPickersUtilsProvider
                libInstance={moment}
                utils={MomentUtils}
                locale={moment.locale('es')}
              >
                <DateTimePicker
                  value={deadlineDate}
                  fullWidth
                  onChange={onChangeDeadlineDate}
                  locale="es"
                  minDate={moment().toDate()}
                  maxDate={moment()
                    .add(15, 'd')
                    .toDate()}
                  cancelLabel="Cancelar"
                  okLabel="Aceptar"
                ></DateTimePicker>
              </MuiPickersUtilsProvider>
            </div>
            <div className={Styles.DateTimePicker}>
              <TextField
                multiline
                fullWidth
                placeholder="¿Por qué será opcionado?"
                rows={3}
                variant="outlined"
                value={optionalTextDescript}
                onChange={optionalDescription}
              />
            </div>
          </div>
        )}
        {currentState === SalesRoomEnum.status.SOLD && (
          <div>
            <div className={Styles.inputContainer}>
              <span className={Styles.title}>Valor Apartamento</span>
              <div>
                <NumberFormat
                  value={Number(priceWithIncrement).toFixed(2)}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
              </div>
            </div>
            <div>
              <AdditionalAreas
                property={property}
                additionalAreas={additionalAreas}
                addAdditionalAreaHandler={addAdditionalAreaHandler}
                deleteAdditionalAreaHandler={deleteAdditionalAreaHandler}
                setAdditionalPrices={setAdditionalPricesHandler}
                status={initialStatus}
              />
            </div>
            <div className={Styles.inputContainer}>
              <span className={Styles.title}>
                Valor Apartamento + Areas Adicionales
              </span>
              <div>
                <NumberFormat
                  value={
                    priceSold === null
                      ? (priceWithIncrement + additionalPrices).toFixed(2)
                      : (Number(fixedPrice) + additionalPrices).toFixed(2)
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
                  <span>Valor Comercial</span>
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
                      value={DISCOUNT}
                      pointColor={StyleVariables.greenColor}
                    >
                      Descuento
                    </ReversedRadioButton>
                    <ReversedRadioButton
                      value={INCREMENT}
                      pointColor={StyleVariables.redColor}
                    >
                      Incremento
                    </ReversedRadioButton>
                  </RadioGroup>
                </div>
              </div>
              <Input
                forceUpdate
                mask="currency"
                className={Styles.input}
                validations={[
                  {
                    fn: (value) => value >= 0,
                    message: 'No se permiten valores negativos',
                  },
                ]}
                onChange={(target) => {
                  const calculatedDiscount =
                    discountState === DISCOUNT
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
                  <span>Valor Financiero</span>
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
                      value={DISCOUNT}
                      pointColor={StyleVariables.greenColor}
                    >
                      Descuento
                    </ReversedRadioButton>
                    <ReversedRadioButton
                      value={INCREMENT}
                      pointColor={StyleVariables.redColor}
                    >
                      Incremento
                    </ReversedRadioButton>
                  </RadioGroup>
                </div>
              </div>

              <Input
                forceUpdate={true}
                mask="currency"
                className={Styles.input}
                validations={[
                  {
                    fn: (value) => value >= 0,
                    message: 'No se permiten valores negativos',
                  },
                ]}
                onChange={(target) => {
                  const calculatedCurrentTradeDiscount =
                    tradeDiscountState === DISCOUNT
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
        <Button
          fullWidth
          color="primary"
          onClick={() => {
            setQuotationOpen(true);
          }}
        >
          Generar cotizacion
        </Button>
      </div>
      <QuotationDialog
        open={quotationOpen}
        closeHandler={() => setQuotationOpen(false)}
        quotationData={{
          propertyId: property.id,
          clientId,
          propertyPrice: getTradePrice(),
        }}
        towerId={towerId}
        spawnMessage={spawnMessage}
      />
      <FinancialDialog propertyPrice={getTradePrice()} m2={property.mts2} />
    </>
  );
};

SalesRoomModal.propTypes = {
  property: PropTypes.shape({
    status: PropTypes.string,
    priceWithIncrement: PropTypes.number,
    priceSold: PropTypes.number,
    discount: PropTypes.number,
    tradeDiscount: PropTypes.number,
    requestStatus: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  clientId: PropTypes.string,
  additionalAreas: PropTypes.array.isRequired,
  addAdditionalAreaHandler: PropTypes.func.isRequired,
  deleteAdditionalAreaHandler: PropTypes.func.isRequired,
  updateInitialStatus: PropTypes.func.isRequired,
};

SalesRoomModal.defaultProps = {
  property: {
    status: SalesRoomEnum.status.OPTIONAL,
    priceWithIncrement: 0,
    priceSold: 0,
    discount: 0,
    tradeDiscount: 0,
  },
};

export default SalesRoomModal;
