import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import Input, { CURRENCY } from '../../../../Shared/Input';
import { changeMarketAveragePrice } from '../../../../../../containers/StrategyV2/actions';
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';

const services = new IncrementsServices();

const AveragePrice = ({
  groupId,
  averagePrice,
  onChangeMarketAveragePrice,
}) => {
  const formRef = useRef();
  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    await services.putMarketAveragePrice(groupId, {
      averagePrice: Number(values.averagePrice),
    });
    onChangeMarketAveragePrice(Number(values.averagePrice));
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        averagePrice,
      }}
      innerRef={formRef}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Field
            name="averagePrice"
            label="Precio promedio"
            placeholder="$5000000"
            mask={CURRENCY}
            onBlur={blurHandler}
            component={Input}
            fullWidth
          />
        </Form>
      )}
    </Formik>
  );
};

AveragePrice.propTypes = {
  groupId: PropTypes.number.isRequired,
  averagePrice: PropTypes.number.isRequired,
  onChangeMarketAveragePrice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return { averagePrice: market.averagePrice, groupId: id };
};

const mapDispatchToProps = {
  onChangeMarketAveragePrice: changeMarketAveragePrice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AveragePrice);
