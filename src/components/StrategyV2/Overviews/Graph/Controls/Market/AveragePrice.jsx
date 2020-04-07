import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Input, { CURRENCY } from '../../../../Shared/Input';
import {
  changeMarketAveragePrice,
  changeMarketGraph,
} from '../../../../../../containers/StrategyV2/actions';
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';

const services = new IncrementsServices();

const AveragePrice = ({
  groupId,
  averagePrice,
  onChangeMarketAveragePrice,
  lenghtMarket,
  onChangeMarketGraph,
}) => {
  const formRef = useRef();
  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    try {
      const marketPrice = await services.putMarketAveragePrice(groupId, {
        averagePrice: Number(values.averagePrice),
        length: lenghtMarket,
      });

      const incrementsFixed = marketPrice.data.increments.map(
        (increment) => increment && increment.toFixed(2),
      );
      onChangeMarketGraph(incrementsFixed);
    } catch (error) {
      console.error(error);
    }
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
  onChangeMarketGraph: PropTypes.func.isRequired,
  lenghtMarket: PropTypes.number,
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  const { strategies } = state.strategy.root.strategyLines[
    state.strategy.root.selectedGroup
  ];
  const lenghtMarket = strategies[0] ? strategies[0].data.length : 0;

  return { averagePrice: market.averagePrice, groupId: id, lenghtMarket };
};

const mapDispatchToProps = {
  onChangeMarketAveragePrice: changeMarketAveragePrice,
  onChangeMarketGraph: changeMarketGraph,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AveragePrice);
