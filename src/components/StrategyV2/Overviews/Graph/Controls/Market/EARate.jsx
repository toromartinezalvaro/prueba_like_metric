import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Input, { PERCENTAGE } from '../../../../Shared/Input';
import { changeMarketEARate } from '../../../../../../containers/StrategyV2/actions';
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';

const services = new IncrementsServices();

const EARateInput = ({ groupId, EARate, onChangeMarketEARate }) => {
  const formRef = useRef();
  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    const percentage = Number(values.EARate / 100);
    await services.putMarketAnualEffectiveIncrement(groupId, {
      anualEffectiveIncrement: percentage,
    });
    onChangeMarketEARate(percentage);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        EARate: EARate * 100,
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
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return { EARate: market.anualEffectiveIncrement, groupId: id };
};

const mapDispatchToProps = {
  onChangeMarketEARate: changeMarketEARate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EARateInput);
