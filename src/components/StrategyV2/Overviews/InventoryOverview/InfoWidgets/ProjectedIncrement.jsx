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
} from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';
import Styles from './ProjectedIncrement.module.scss';
import SalesWizard from './SalesWizard/index';
import IncrementsServices from '../../../../../services/increments/IncrementsServices';

const validationSchema = yup.object().shape({
  projectedIncrement: yup
    .number('El incremento es un dato numerico')
    .required('Es necesario ingresar un incremento'),
});

const ProjectedIncrement = ({
  group,
  suggestedEffectiveAnnualInterestRate,
  groupId,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  onSuggestedIncrementChange,
  onIncrementChange,
  mini,
  field,
}) => {
  const { towerId } = useParams();
  const formRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const services = new IncrementsServices();
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

  const putIncrement = (id, increment) => {
    services.putIncrement(towerId, {
      groupId: id,
      increment: parseFloat(increment),
    });
    onIncrementChange(Number(increment));
  };

  const putSuggestedEffectiveAnnualInterestRate = async (
    id,
    effectiveAnnualInterestRate,
  ) => {
    const suggestedIncrement = await services.putSuggestedEffectiveAnnualInterestRate(
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

  const projectedIncrement = useMemo(() => {
    return Numbers.toFixed(totalIncrement - salesIncrement - appliedIncrement);
  }, [totalIncrement, salesIncrement, appliedIncrement]);

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = (values) => {
    const increment =
      Number(values.projectedIncrement) + appliedIncrement + salesIncrement;
    services.putIncrement(towerId, {
      groupId,
      increment,
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
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const group = state.strategy.root.groups[state.strategy.root.selectedGroup];
  const { total, sales, inventory, id } = state.strategy.root.groups[
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
  };
};

const mapDispatchToProps = {
  onIncrementChange: changeIncrement,
  onSuggestedIncrementChange: changeSuggestedEA,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
