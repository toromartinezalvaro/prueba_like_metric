import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Input, { NUMBER } from '../../../Shared/Input';
import Widget, { SM } from '../../../Shared/Widget';
import { changeSaleSpeed } from '../../../../../containers/StrategyV2/actions';
import IncrementServices from '../../../../../services/increments/IncrementsServices';

const services = new IncrementServices();

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
  onSaleSpeedChange,
  isReset,
}) => {
  const formRef = useRef();

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = (values) => {
    services.putSalesSpeeds(groupId, {
      salesSpeed: Number(values.saleSpeed),
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
                disabled={!isReset}
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
  isReset: PropTypes.bool.isRequired,
};

SaleSpeed.defaultProps = {
  field: false,
};

const mapStateToProps = (state) => {
  const { id, inventory, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    groupId: id,
    saleSpeed: inventory.saleSpeed,
    isReset,
  };
};

const mapDispatchToProps = {
  onSaleSpeedChange: changeSaleSpeed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleSpeed);
