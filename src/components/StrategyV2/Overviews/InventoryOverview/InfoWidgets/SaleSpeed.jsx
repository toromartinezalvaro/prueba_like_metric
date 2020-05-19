import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import Input, { NUMBER } from '../../../Shared/Input';
import Widget, { SM } from '../../../Shared/Widget';
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

const validationSchema = (rotationMonths, units) => {
  let numberToValidation = Numbers.cleanNumber(units / rotationMonths);

  if (rotationMonths > 98) {
    numberToValidation = units / 98;
  }

  return yup.object().shape({
    saleSpeed: yup
      .number()
      .min(
        numberToValidation,
        `La velocidad debe ser mayor a ${Numbers.toFixed(numberToValidation)}`,
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
  field,
  onFetchedData,
  startApiLoading,
  stopApiLoading,
  strategy,
  isReset,
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

  return (
    <Widget title="Velocidad de ventas" size={SM}>
      {field ? (
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
                label="Velocidad de ventas"
                placeholder="1,3"
                mask={NUMBER}
                onBlur={blurHandler}
                component={Input}
                disabled={strategy && !isReset}
              />
            </Form>
          )}
        </Formik>
      ) : (
        Numbers.toFixed(saleSpeed)
      )}
    </Widget>
  );
};

SaleSpeed.propTypes = {
  groupId: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  futureSaleSpeed: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  rotationMonths: PropTypes.number.isRequired,
  field: PropTypes.bool,
  onFetchedData: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  isReset: PropTypes.bool,
  strategy: PropTypes.number,
};

SaleSpeed.defaultProps = {
  field: false,
};

const mapStateToProps = (state) => {
  const {
    id,
    inventory,
    initialFee,
    isReset,
    strategy,
  } = state.strategy.root.groups[state.strategy.root.selectedGroup];

  return {
    groupId: id,
    saleSpeed:
      state.strategy.overviews.view === MAIN_VIEW
        ? inventory.saleSpeed
        : inventory.futureSaleSpeed,
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
