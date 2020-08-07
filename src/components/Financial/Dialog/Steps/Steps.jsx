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
import { actions as DateActions } from '../Info/Dates';
import Services from '../../../../services/financing';
import { useEffect, useState } from 'react';
import Numbers from '../../../../helpers/numbers';
import { indigo } from '@material-ui/core/colors';
import Comparable from '../../../../helpers/comparable';

const services = new Services();

const Steps = ({
  propertyPrice,
  setFinancialInfo,
  setInitialFeeInfo,
  setExtraFeesInfo,
  setBankInfo,
  setFinancialBankDialogInfo,
  setEndOfSales,
  anualEffectiveRate,
  totalYears,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    const body = {
      ...values,
      monthlyRate: (1 + values.monthlyRate / 100) ** (1 / 12) - 1,
      initialFeeBasePercentage: values.initialFeeBasePercentage / 100,
    };

    try {
      const response = await services.getFinancingInfo(towerId, body);

      setEndOfSales(response.data.schedule.averageDeliveryDate);
      setFinancialInfo({
        financing: response.data.financialValue,
        paidPrice: response.data.valueToPay,
      });
      setInitialFeeInfo(response.data.initialFees);
      setExtraFeesInfo(response.data.extraFees);
      setBankInfo(response.data.bankFees);
      setFinancialBankDialogInfo({
        ...response.data.bankFeesDetail,
        editTotalYears: false,
        editAnualEffectiveRate: false,
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const [initialValues, setInitialValues] = useState({
    propertyValue: propertyPrice,
    separationValue: 0,
    monthlyRate: 0,
    termLimit: 0,
    initialFeeBasePercentage: 0,
    anualEffectiveRate: 0.11,
    totalYears: 20,
    additionalFees: [],
  });

  const [formValues, setFormValues] = useState({
    propertyValue: propertyPrice,
    separationValue: 0,
    monthlyRate: 0,
    termLimit: 0,
    initialFeeBasePercentage: 0,
    anualEffectiveRate: 0.11,
    totalYears: 20,
    additionalFees: [],
  });

  useEffect(() => {
    handleSubmit({
      ...formValues,
      anualEffectiveRate: Numbers.cleanNumber(anualEffectiveRate / 100),
      totalYears,
    });
    setFormValues({ ...formValues, anualEffectiveRate, totalYears });
  }, [anualEffectiveRate, totalYears]);

  const updateAndGetAdditionalFees = (values, name, value) => {
    const index = name.split('--')[0];
    const key = name.split('--')[1];
    if (index && key) {
      const currentFee = values.additionalFees[index];
      console.log({ currentFee, key, value });
      if (currentFee) currentFee[key] = value;
    }
    return values.additionalFees;
  };

  const onChangeForm = (e, values, handleChange) => {
    const targetElement = e.target;
    const fieldName = targetElement.name;

    const additionalFees = updateAndGetAdditionalFees(
      values,
      targetElement.name,
      targetElement.value,
    );
    setFormValues({
      ...formValues,
      [fieldName]: targetElement.value,
      additionalFees,
    });

    return handleChange(e);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => {
        const onChange = (e) => onChangeForm(e, values, handleChange);

        return (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Step title={<Step1Title />}>
                  <Step1
                    initialFeeRate={values.initialFeeBasePercentage}
                    onChange={onChange}
                  />
                </Step>
              </Grid>
              <Grid item xs={12}>
                <Step title={<Step2Title />}>
                  <Step2 onChange={onChange} />
                </Step>
              </Grid>
              <Grid item xs={12}>
                <Step title={<Step3Title />}>
                  <Step3
                    additionalFees={values.additionalFees}
                    onChange={onChange}
                  />
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
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  propertyPrice: state.financial.dialog.root.propertyPrice,
  totalYears: state.financial.dialog.info.bank.dialog.temporalTotalYears,
  anualEffectiveRate:
    state.financial.dialog.info.bank.dialog.temporalAnualEffectiveRate,
});

const mapDispatchToProps = {
  setFinancialInfo: FinancialInfoActions.setFinancialInfo,
  setInitialFeeInfo: InitialFeeActions.setInitialFeeInfo,
  setExtraFeesInfo: ExtraFeeActions.setExtraFeesInfo,
  setBankInfo: BankActions.setBankInfo,
  setFinancialBankDialogInfo: BankDialogActions.setFinancialBankDialogInfo,
  setEndOfSales: DateActions.setInfoDateData,
};

Steps.propTypes = {
  propertyPrice: PropTypes.number.isRequired,
  setFinancialInfo: PropTypes.func.isRequired,
  setInitialFeeInfo: PropTypes.func.isRequired,
  setExtraFeesInfo: PropTypes.func.isRequired,
  setBankInfo: PropTypes.func.isRequired,
  setFinancialBankDialogInfo: PropTypes.func.isRequired,
  setEndOfSales: PropTypes.func.isRequired,
  anualEffectiveRate: PropTypes.number,
  totalYears: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
