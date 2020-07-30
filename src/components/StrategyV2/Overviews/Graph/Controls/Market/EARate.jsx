import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import Input, { PERCENTAGE } from '../../../../Shared/Input';
import {
  fetchDataSuccess,
  changeMarketGraph,
} from '../../../../../../containers/StrategyV2/actions';

import IncrementsServices from '../../../../../../services/increments/IncrementsServices';
import IncrementsV2Services from '../../../../../../services/incrementsV2/incrementsService';
import generateDataset from '../../../../../../containers/StrategyV2/helpers/dataset';
import { startLoading, stopLoading } from '../../../../Loader/actions';
import Numbers from '../../../../../../helpers/numbers';
import validateSelectedGroup from '../../../../Shared/Validator';

const services = {
  increments: new IncrementsServices(),
  increments2: new IncrementsV2Services(),
};

const EARateInput = ({
  groupId,
  EARate,
  startApiLoading,
  onChangeMarketGraph,
  stopApiLoading,
  lengthMarket,
  initialMonth,
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
    const percentage = Number(values.EARate / 100);
    if (percentage !== EARate) {
      try {
        startApiLoading();
        const marketPrice = await services.increments.putMarketAnualEffectiveIncrement(
          groupId,
          {
            anualEffectiveIncrement: percentage,
            towerId,
            lengthMarket,
            initialMonth,
          },
        );
        const incrementsFixed = marketPrice.data.increments.map(
          (increment) => increment && increment.toFixed(2),
        );
        onChangeMarketGraph(incrementsFixed);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
      stopApiLoading();
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        EARate: Numbers.toFixed(EARate * 100),
      }}
      innerRef={formRef}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Field
            name="EARate"
            label="E.A"
            placeholder="1.5%"
            mask={PERCENTAGE}
            onBlur={blurHandler}
            component={Input}
            fullWidth
          />
        </Form>
      )}
    </Formik>
  );
};

EARateInput.propTypes = {
  groupId: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  onChangeMarketEARate: PropTypes.func.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  onChangeMarketGraph: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  initialMonth: PropTypes.string,
  lengthMarket: PropTypes.number,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  const currentGroup =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  let lengthMarket = 0;
  if (currentGroup) {
    lengthMarket = currentGroup.strategies[0]
      ? currentGroup.strategies[0].data.length
      : 0;
  }
  return {
    EARate: market.anualEffectiveIncrement,
    groupId: id,
    lengthMarket,
    initialMonth: currentGroup.initialMonth,
  };
};

const mapDispatchToProps = {
  startApiLoading: startLoading,
  onChangeMarketGraph: changeMarketGraph,
  stopApiLoading: stopLoading,
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EARateInput);
