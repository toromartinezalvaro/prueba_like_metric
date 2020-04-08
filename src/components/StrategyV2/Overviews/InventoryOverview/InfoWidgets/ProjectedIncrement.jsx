import React, { useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import NumberFormat from 'react-number-format';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import Widget, { XS, SM } from '../../../Shared/Widget';
import Input, { CURRENCY } from '../../../Shared/Input';
import {
  changeIncrement,
  changeSuggestedEA,
  changeSummary,
  fetchDataSuccess,
} from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';
import Styles from './ProjectedIncrement.module.scss';
import SalesWizard from './SalesWizard/index';
import IncrementsServices from '../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../services/incrementsV2/incrementsService';
import generateDataset from '../../../../../containers/StrategyV2/helpers/dataset';

const validationSchema = yup.object().shape({
  projectedIncrement: yup
    .number('El incremento es un dato numerico')
    .required('Es necesario ingresar un incremento'),
});

const services = {
  increment: new IncrementsServices(),
  increment2: new Increment2Services(),
};

const ProjectedIncrement = ({
  group,
  suggestedEffectiveAnnualInterestRate,
  groupId,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  onSuggestedIncrementChange,
  onIncrementChange,
  onSummaryChange,
  mini,
  field,
  isReset,
  onFetchedData,
}) => {
  const { towerId } = useParams();
  const formRef = useRef();

  //! THIS IS NOT PART OF THIS MODULE REMOVE IT AND PUT IT ON TO THE MODAL STATE.
  const [isModalOpen, setModalOpen] = useState(false);
  const inputValidations = [
    {
      fn: (value) => value > 0,
      message: 'Los meses de retención deben ser mayores a 0',
    },
    {
      fn: (value) => value <= 98,
      message: 'Los meses de retención deben ser menores a 98',
    },
  ];

  const putIncrement = async (id, increment) => {
    try {
      const incrementResponse = await services.increment.putIncrement(towerId, {
        groupId: id,
        increment: parseFloat(increment),
      });
      onIncrementChange(Number(increment));
      onSummaryChange(incrementResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const putSuggestedEffectiveAnnualInterestRate = async (
    id,
    effectiveAnnualInterestRate,
  ) => {
    const suggestedIncrement = await services.increment.putSuggestedEffectiveAnnualInterestRate(
      id,
      {
        effectiveAnnualInterestRate: parseFloat(effectiveAnnualInterestRate),
      },
    );
    onSuggestedIncrementChange({
      suggestedEffectiveAnnualInterestRate: parseFloat(
        effectiveAnnualInterestRate,
      ),
      suggestedIncrement: suggestedIncrement.data,
    });
  };

  //! END

  const projectedIncrement = useMemo(() => {
    return Numbers.toFixed(totalIncrement - salesIncrement - appliedIncrement);
  }, [totalIncrement, salesIncrement, appliedIncrement]);

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    const increment =
      Number(values.projectedIncrement) + appliedIncrement + salesIncrement;
    await services.increment.putIncrement(towerId, {
      groupId,
      increment: parseFloat(increment),
    });
    const response = await services.increment2.getIncrementsAndStrategy(
      towerId,
    );
    onFetchedData({
      strategyLines: generateDataset(response.data.increments),
      groups: response.data.summary.increments,
    });
    onIncrementChange(Number(increment));
  };

  return (
    <Widget title="Incremento proyectado " size={mini ? XS : SM}>
      {field ? (
        <>
          <Formik
            initialValues={{
              projectedIncrement,
            }}
            innerRef={formRef}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <Field
                  name="projectedIncrement"
                  label="Incremento"
                  placeholder="1000,3"
                  mask={CURRENCY}
                  component={Input}
                  onBlur={blurHandler}
                  disabled={!isReset}
                />
              </Form>
            )}
          </Formik>
          <Tooltip
            title="Abrir ayuda ventas"
            onClick={() => setModalOpen(true)}
          >
            <span className={Styles.Badge}>?</span>
          </Tooltip>
        </>
      ) : (
        <NumberFormat
          value={Numbers.toFixed(projectedIncrement)}
          displayType="text"
          prefix="$"
          thousandSeparator
        />
      )}
      <SalesWizard
        data={group}
        suggestedEffectiveAnnualInterestRate={
          suggestedEffectiveAnnualInterestRate
        }
        validations={[
          ...inputValidations,
          {
            fn: (value) =>
              value <= moment(Number(group.sales.date)).diff(moment(), 'month'),
            message: 'Los meses de retencion superan la fecha final de ventas',
          },
        ]}
        putSuggestedEffectiveAnnualInterestRate={(suggestedEARate) =>
          putSuggestedEffectiveAnnualInterestRate(group.id, suggestedEARate)
        }
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        isReset={group.isReset}
        putIncrement={(incrementP) => {
          putIncrement(group.id, incrementP);
        }}
        salesIncrement={group.sales.increment}
      />
    </Widget>
  );
};

ProjectedIncrement.propTypes = {
  groupId: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  suggestedEffectiveAnnualInterestRate: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  onSuggestedIncrementChange: PropTypes.func.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  field: PropTypes.bool,
  isReset: PropTypes.bool.isRequired,
  onFetchedData: PropTypes.func.isRequired,
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const group = state.strategy.root.groups[state.strategy.root.selectedGroup];
  const { total, sales, inventory, id, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    group,
    groupId: id,
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
    suggestedEffectiveAnnualInterestRate:
      inventory.suggestedEffectiveAnnualInterestRate,
    isReset,
  };
};

const mapDispatchToProps = {
  onIncrementChange: changeIncrement,
  onSuggestedIncrementChange: changeSuggestedEA,
  onSummaryChange: changeSummary,
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
