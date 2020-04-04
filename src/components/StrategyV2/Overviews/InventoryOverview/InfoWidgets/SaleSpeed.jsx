import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Input, { NUMBER } from '../../../Shared/Input';
import Widget, { SM } from '../../../Shared/Widget';
import { changeSaleSpeed } from '../../../../../containers/StrategyV2/actions';
import IncrementServices from '../../../../../services/increments/IncrementsServices';

const validationSchema = yup.object().shape({
  projectedIncrement: yup
    .number('El incremento es un dato numerico')
    .required('Es necesario ingresar un incremento'),
});

const services = new IncrementServices();

const SaleSpeed = ({ groupId, saleSpeed, field, onSaleSpeedChange }) => {
  const formRef = useRef();

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = (values) => {
    services.putSalesSpeeds(groupId, {
      salesSpeed: values.saleSpeed,
    });
    onSaleSpeedChange(Number(values.saleSpeed));
  };

  return (
    <Widget title="Velocidad de ventas" size={SM}>
      {field ? (
        <Formik
          initialValues={{
            saleSpeed,
          }}
          innerRef={formRef}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
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
  onSaleSpeedChange: PropTypes.func.isRequired,
  field: PropTypes.bool,
};

SaleSpeed.defaultProps = {
  field: false,
};

const mapStateToProps = (state) => ({
  groupId: state.strategy.root.groups[state.strategy.root.selectedGroup].id,
  saleSpeed:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .saleSpeed,
});

const mapDispatchToProps = {
  onSaleSpeedChange: changeSaleSpeed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleSpeed);
