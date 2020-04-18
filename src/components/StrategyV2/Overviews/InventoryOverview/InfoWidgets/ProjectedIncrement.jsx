import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import NumberFormat from 'react-number-format';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import SalesWizard, { actions } from './SalesWizard';
import Widget, { XS, SM } from '../../../Shared/Widget';
import Input, { CURRENCY } from '../../../Shared/Input';
import { fetchDataSuccess } from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';
import IncrementsServices from '../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../services/incrementsV2/incrementsService';
import generateDataset from '../../../../../containers/StrategyV2/helpers/dataset';
import { startLoading, stopLoading } from '../../../Loader/actions';

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
  groupId,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  mini,
  field,
  isReset,
  onFetchedData,
  startApiLoading,
  stopApiLoading,
  openSalesWizardDialog,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef();

  const projectedIncrement = useMemo(() => {
    return Numbers.toFixed(totalIncrement - salesIncrement - appliedIncrement);
  }, [totalIncrement, salesIncrement, appliedIncrement]);

  const blurHandler = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const submitHandler = async (values) => {
    try {
      startApiLoading();
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
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
    stopApiLoading();
  };

  return (
    <>
      <Widget title="Incremento proyectado " size={mini ? XS : SM}>
        {field ? (
          <>
            <Formik
              enableReinitialize
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
            <Button
              size="small"
              color="primary"
              onClick={openSalesWizardDialog}
            >
              Abrir asistente
            </Button>
          </>
        ) : (
          <NumberFormat
            value={Numbers.toFixed(projectedIncrement)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        )}
      </Widget>
      <SalesWizard />
    </>
  );
};

ProjectedIncrement.propTypes = {
  groupId: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  mini: PropTypes.bool,
  field: PropTypes.bool,
  isReset: PropTypes.bool.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  openSalesWizardDialog: PropTypes.func.isRequired,
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory, id, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    groupId: id,
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
    isReset,
  };
};

const mapDispatchToProps = {
  onFetchedData: fetchDataSuccess,
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
  openSalesWizardDialog: actions.openSalesWizardDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
