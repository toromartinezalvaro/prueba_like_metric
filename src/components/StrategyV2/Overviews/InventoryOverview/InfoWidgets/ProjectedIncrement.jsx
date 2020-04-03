import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import NumberFormat from 'react-number-format';
import Widget, { XS, SM } from '../../../Shared/Widget';
import Input, { CURRENCY } from '../../../Shared/Input';
import { changeIncrement } from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';
import IncrementServices from '../../../../../services/increments/IncrementsServices';

const services = new IncrementServices();

const validationSchema = yup.object().shape({
  projectedIncrement: yup
    .number('El incremento es un dato numerico')
    .required('Es necesario ingresar un incremento'),
});

const ProjectedIncrement = ({
  groupId,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  onIncrementChange,
  mini,
  field,
}) => {
  const { towerId } = useParams();
  const formRef = useRef();

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
    <Widget title="Incremento proyectado" size={mini ? XS : SM}>
      {field ? (
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
      ) : (
        <NumberFormat
          value={Numbers.toFixed(projectedIncrement)}
          displayType="text"
          prefix="$"
          thousandSeparator
        />
      )}
    </Widget>
  );
};

ProjectedIncrement.propTypes = {
  groupId: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  field: PropTypes.bool,
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const { id, total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    groupId: id,
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
  };
};

const mapDispatchToProps = {
  onIncrementChange: changeIncrement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
