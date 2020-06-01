import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import Step from '../Step';
import Step1, { Title as Step1Title } from './Step1';
import Step2, { Title as Step2Title } from './Step2';
import Step3, { Title as Step3Title } from './Step3';
import { actions as FinancialInfoActions } from '../Info/FinancialInfo';
import { actions as InitialFeeActions } from '../Info/InitialFee';
import { actions as ExtraFeeActions } from '../Info/ExtraFees';
import { actions as BankActions } from '../Info/BankCredit';
import { actions as BankDialogActions } from '../Info/BankCredit/Dialog';
import Services from '../../../../services/financing';

const services = new Services();

// TODO: RECIBIR LA INFO DEL APARTAMENTO
// TODO: AGREGAR STATE PARA OPEN DEL MODAL
const Steps = ({
  setFinancialInfo,
  setInitialFeeInfo,
  setExtraFeesInfo,
  setBankInfo,
  setFinancialBankDialogInfo,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    // TODO: NO REMPLAZAR LOS VALUES DIRECTAMENTE
    values.monthlyRate /= 100;
    values.initialFeeBasePercentage /= 100;

    values.monthlyRate = (1 + values.monthlyRate) ** (1 / 12) - 1;
    try {
      const response = await services.getFinancingInfo(towerId, values);
      setFinancialInfo({
        financing: response.data.financialValue,
        paidPrice: response.data.valueToPay,
      });
      setInitialFeeInfo(response.data.initialFees);
      setExtraFeesInfo(response.data.extraFees);
      setBankInfo(response.data.bankFees);
      setFinancialBankDialogInfo(response.data.bankFeesDetail);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Formik
      // initialValues={{
      //   propertyValue: 252281164.69731,
      //   separationValue: 2000000,
      //   monthlyRate: 0.009488793,
      //   termLimit: 36,
      //   initialFeeBasePercentage: 0.3,
      //   additionalFees: [],
      // }}
      initialValues={{
        propertyValue: 0,
        separationValue: 0,
        monthlyRate: 0,
        termLimit: 0,
        initialFeeBasePercentage: 0,
        additionalFees: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Step title={<Step1Title />}>
                <Step1 initialFeeRate={values.initialFeeBasePercentage} />
              </Step>
            </Grid>
            <Grid item xs={12}>
              <Step title={<Step2Title />}>
                <Step2 />
              </Step>
            </Grid>
            <Grid item xs={12}>
              <Step title={<Step3Title />}>
                <Step3 additionalFees={values.additionalFees} />
              </Step>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
              >
                Calcular
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setFinancialInfo: FinancialInfoActions.setFinancialInfo,
  setInitialFeeInfo: InitialFeeActions.setInitialFeeInfo,
  setExtraFeesInfo: ExtraFeeActions.setExtraFeesInfo,
  setBankInfo: BankActions.setBankInfo,
  setFinancialBankDialogInfo: BankDialogActions.setFinancialBankDialogInfo,
};

Steps.propTypes = {
  setFinancialInfo: PropTypes.func.isRequired,
  setInitialFeeInfo: PropTypes.func.isRequired,
  setExtraFeesInfo: PropTypes.func.isRequired,
  setBankInfo: PropTypes.func.isRequired,
  setFinancialBankDialogInfo: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
