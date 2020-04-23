import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import Input, { CURRENCY } from '../../../../Shared/Input';
import {
  changeMarketAveragePrice,
  changeMarketGraph,
} from '../../../../../../containers/StrategyV2/actions';
import { startLoading, stopLoading } from '../../../../Loader/actions';
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';

const services = new IncrementsServices();

const AveragePrice = ({
  groupId,
  averagePrice,
  onChangeMarketAveragePrice,
  lenghtMarket,
  onChangeMarketGraph,
  startApiLoading,
  stopApiLoading,
}) => {
  const formRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    if (values.averagePrice !== averagePrice) {
      try {
        startApiLoading();
        const marketPrice = await services.putMarketAveragePrice(groupId, {
          averagePrice: Number(values.averagePrice),
          length: lenghtMarket,
        });

        const incrementsFixed = marketPrice.data.increments.map(
          (increment) => increment && increment.toFixed(2),
        );
        onChangeMarketGraph(incrementsFixed);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
      onChangeMarketAveragePrice(Number(values.averagePrice));
      stopApiLoading();
    }
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
  onChangeMarketGraph: PropTypes.func.isRequired,
  lenghtMarket: PropTypes.number,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  const currentGroup =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  let lenghtMarket = 0;
  if (currentGroup) {
    lenghtMarket = currentGroup.strategies[0]
      ? currentGroup.strategies[0].data.length
      : 0;
  }

  return { averagePrice: market.averagePrice, groupId: id, lenghtMarket };
};

const mapDispatchToProps = {
  onChangeMarketAveragePrice: changeMarketAveragePrice,
  onChangeMarketGraph: changeMarketGraph,
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AveragePrice);
