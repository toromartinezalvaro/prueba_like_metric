import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import Input, { PERCENTAGE } from '../../../../Shared/Input';
import { fetchDataSuccess } from '../../../../../../containers/StrategyV2/actions';
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';
import IncrementsV2Services from '../../../../../../services/incrementsV2/incrementsService';
import generateDataset from '../../../../../../containers/StrategyV2/helpers/dataset';
import { startLoading, stopLoading } from '../../../../Loader/actions';
import Numbers from '../../../../../../helpers/numbers';

const services = {
  increments: new IncrementsServices(),
  increments2: new IncrementsV2Services(),
};

const EARateInput = ({
  groupId,
  EARate,
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
    const percentage = Number(values.EARate / 100);
    if (percentage !== EARate) {
      try {
        startApiLoading();
        await services.increments.putMarketAnualEffectiveIncrement(groupId, {
          anualEffectiveIncrement: percentage,
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
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return { EARate: market.anualEffectiveIncrement, groupId: id };
};

const mapDispatchToProps = {
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EARateInput);
