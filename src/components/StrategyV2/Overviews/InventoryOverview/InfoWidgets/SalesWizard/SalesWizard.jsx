import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StrategySelect from './StrategySelect';
import Input, { PERCENTAGE } from '../../../../Shared/Input';
import {
  closeSalesWizardDialog,
  changeSuggestedIncrement,
  setCalculated,
  setNotCalculated,
} from './actions';
import {
  changeIncrement,
  fetchDataSuccess,
} from '../../../../../../containers/StrategyV2/actions';
import { startLoading, stopLoading } from '../../../../Loader/actions';
import IncrementServices from '../../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../../services/incrementsV2/incrementsService';
import Numbers from '../../../../../../helpers/numbers';
import generateDataset from '../../../../../../containers/StrategyV2/helpers/dataset';

const services = {
  increments: new IncrementServices(),
  increments2: new Increment2Services(),
};

const validationSchema = yup.object().shape({
  ear: yup
    .number()
    .typeError('Es necesario ingresar un numero como tasa')
    .required('Es obligatorio ingresar un tasa'),
});

export const SalesWizard = ({
  groupId,
  totalUnits,
  salesUnits,
  rotationMonths,
  open,
  calculated,
  suggestedIncrement,
  closeHandler,
  onSuggestedIncrementChange,
  changeIncrementHandler,
  startApiLoading,
  stopApiLoading,
  onFetchedData,
  onCalculatedClicked,
  onCalculatedReset,
}) => {
  useEffect(() => {
    onSuggestedIncrementChange(0);
    onCalculatedReset();
  }, [open]);

  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const units = totalUnits - salesUnits;

  const handleSubmit = async (values) => {
    const { ear, frequency } = values;
    try {
      const response = await services.increments2.getSuggestedIncrement(
        groupId,
        ear / 100,
        frequency,
      );
      onCalculatedClicked();
      onSuggestedIncrementChange(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleApplyIncrement = async () => {
    try {
      closeHandler();
      startApiLoading();
      await services.increments.putIncrement(towerId, {
        groupId,
        increment: suggestedIncrement,
      });
      const response = await services.increments2.getIncrementsAndStrategy(
        towerId,
      );
      onFetchedData({
        strategyLines: generateDataset(response.data.increments),
        groups: response.data.summary.increments,
      });
      changeIncrementHandler(suggestedIncrement);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    stopApiLoading();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Asistente de incrementos</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese la tasa efectiva anual y el tipo de estrategia a la que quiere
          apuntar, el asistente le dara una sugerencia del incremento.
        </DialogContentText>
        <Box mb={2}>
          <Grid container justify="space-between" mb={2}>
            <Grid item>
              <Typography>Rotación de inventario: {rotationMonths}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Incremento sugerido:
                <NumberFormat
                  value={Numbers.toFixed(suggestedIncrement)}
                  displayType="text"
                  prefix="$"
                  thousandSeparator
                />
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Formik
          initialValues={{
            ear: null,
            frequency: 1,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid }) => (
            <Form>
              <Box mb={2}>
                <Field
                  name="ear"
                  label="Tasa efectiva anual"
                  placeholder="5.3%"
                  mask={PERCENTAGE}
                  component={Input}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="frequency"
                  units={units}
                  component={StrategySelect}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Calcular
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeHandler}>
          Cerrar
        </Button>
        <Button
          color="primary"
          onClick={handleApplyIncrement}
          disabled={!calculated}
        >
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SalesWizard.propTypes = {
  groupId: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  rotationMonths: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  calculated: PropTypes.bool.isRequired,
  suggestedIncrement: PropTypes.number.isRequired,
  onSuggestedIncrementChange: PropTypes.func.isRequired,
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  changeIncrementHandler: PropTypes.func.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  onCalculatedClicked: PropTypes.func.isRequired,
  onCalculatedReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { id, total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    groupId: id,
    totalUnits: total.units,
    salesUnits: sales.units,
    rotationMonths: inventory.rotationMonths,
    open: state.strategy.salesWizard.open,
    calculated: state.strategy.salesWizard.calculated,
    suggestedIncrement: state.strategy.salesWizard.suggestedIncrement,
  };
};

const mapDispatchToProps = {
  closeHandler: closeSalesWizardDialog,
  onSuggestedIncrementChange: changeSuggestedIncrement,
  changeIncrementHandler: changeIncrement,
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
  onFetchedData: fetchDataSuccess,
  onCalculatedClicked: setCalculated,
  onCalculatedReset: setNotCalculated,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesWizard);
