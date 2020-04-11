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

const services = {
  increments: new IncrementServices(),
  increments2: new Increment2Services(),
};

const validationSchema = yup.object().shape({
  saleSpeed: yup
    .number()
    .min(0, 'La velocidad debe ser mayor a 0')
    .max(99, 'La velocidad debe ser menor a 99'),
});

const SaleSpeed = ({
  groupId,
  saleSpeed,
  field,
  onFetchedData,
  startApiLoading,
  stopApiLoading,
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
    stopApiLoading();
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
          validationSchema={validationSchema}
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
              />
            </Form>
          )}
        </Formik>
      ) : (
        saleSpeed
      )}
    </Widget>
  );
};

SaleSpeed.propTypes = {
  groupId: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  field: PropTypes.bool,
  onFetchedData: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
};

SaleSpeed.defaultProps = {
  field: false,
};

const mapStateToProps = (state) => {
  const { id, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    groupId: id,
    saleSpeed: inventory.saleSpeed,
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
