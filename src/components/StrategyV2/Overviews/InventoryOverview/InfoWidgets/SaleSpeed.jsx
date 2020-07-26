import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Input, { NUMBER } from '../../../Shared/Input';
import Widget, { LG, Type } from '../../../Shared/Widget';
import { fetchDataSuccess } from '../../../../../containers/StrategyV2/actions';
import IncrementServices from '../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../services/incrementsV2/incrementsService';
import generateDataset from '../../../../../containers/StrategyV2/helpers/dataset';
import { startLoading, stopLoading } from '../../../Loader/actions';
import { Numbers } from '../../../../../helpers';
import { MAIN_VIEW } from '../../reducer';

const services = {
  increments: new IncrementServices(),
  increments2: new Increment2Services(),
};

const getMinSaleSpeed = (rotationMonths, units) => {
  let numberToValidation = Numbers.cleanNumber(units / rotationMonths);

  if (rotationMonths > 98) {
    numberToValidation = units / 98;
  }

  return numberToValidation;
};

const validationSchema = (rotationMonths, units) => {
  const numberToValidation = getMinSaleSpeed(rotationMonths, units);

  return yup.object().shape({
    saleSpeed: yup
      .number()
      .min(
        numberToValidation,
        `La velocidad debe ser mayor o igual a ${Numbers.toFixed(
          numberToValidation,
        )}`,
      )
      .max(
        units,
        `La velocidad debe ser menor o igual a ${Numbers.toFixed(
          numberToValidation,
        )}`,
      ),
  });
};

const SaleSpeed = ({
  groupId,
  saleSpeed,
  futureSaleSpeed,
  units,
  rotationMonths,
  type,
  onFetchedData,
  startApiLoading,
  stopApiLoading,
  strategy,
  isReset,
  realSalesSpeed,
  openHandler,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef();

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    if (values.saleSpeed && Number(values.saleSpeed) !== saleSpeed) {
      try {
        startApiLoading();
        await services.increments.putSalesSpeeds(groupId, {
          salesSpeed: Number(values.saleSpeed),
        });
        const response = await services.increments2.getIncrementsAndStrategy(
          towerId,
        );
        onFetchedData({
          strategyLines: generateDataset(response.data.increments),
          groups: response.data.summary.increments,
        });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
      stopApiLoading();
    }
  };

  let title = '';
  let component = null;
  if (groupId === 0 && type == Type.objetive) {
    type = null;
  }
  switch (type) {
    case Type.objetive:
      component = (
        <Formik
          initialValues={{
            saleSpeed,
          }}
          innerRef={formRef}
          onSubmit={submitHandler}
          validationSchema={validationSchema(rotationMonths, units)}
          enableReinitialize
        >
          {() => (
            <Form>
              <Field
                name="saleSpeed"
                label="Velocidad de ventas objetivo"
                placeholder={getMinSaleSpeed(rotationMonths, units)}
                mask={NUMBER}
                onBlur={blurHandler}
                component={Input}
                disabled={strategy && !isReset}
              />
            </Form>
          )}
        </Formik>
      );
      title = 'Velocidad de ventas objetivo';
      break;
    case Type.real:
      component = Numbers.toFixed(realSalesSpeed);
      title = 'Velocidad de ventas real';
      break;
    default:
      component = Numbers.toFixed(futureSaleSpeed);
      title = `Velocidad de ventas ${
        groupId === 0 ? 'objetivo' : 'inventario'
      }`;
      break;
  }

  return (
    <Widget
      title={
        <>
          {title}
          {openHandler !== undefined && (
            <Button
              colo="primary"
              variant="outlined"
              disabled={strategy === null}
              onClick={openHandler}
              size="small"
              fullWidth
            >
              Objetivo
            </Button>
          )}
        </>
      }
    >
      {component}
    </Widget>
  );
};

SaleSpeed.propTypes = {
  groupId: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  futureSaleSpeed: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  rotationMonths: PropTypes.number.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  isReset: PropTypes.bool,
  strategy: PropTypes.number,
  realSalesSpeed: PropTypes.number.isRequired,
  type: PropTypes.string,
  openHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    id,
    inventory,
    initialFee,
    isReset,
    strategy,
    sales,
  } = state.strategy.root.groups[state.strategy.root.selectedGroup];

  return {
    groupId: id,
    futureSaleSpeed: inventory.saleSpeed,
    saleSpeed: inventory.futureSaleSpeed,
    realSalesSpeed: sales.saleSpeed,
    units: inventory.units,
    rotationMonths: initialFee,
    strategy,
    isReset,
  };
};

const mapDispatchToProps = {
  onFetchedData: fetchDataSuccess,
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleSpeed);
