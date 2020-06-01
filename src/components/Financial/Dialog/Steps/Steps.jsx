import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import Step from '../Step';
import Step1, { Title as Step1Title } from './Step1';
import Step2, { Title as Step2Title } from './Step2';
import Step3, { Title as Step3Title } from './Step3';
import Services from '../../../../services/financing';

const services = new Services();

const Steps = () => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const response = await services.getFinancingInfo(towerId, values);
      console.log(response);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Formik
      initialValues={{
        propertyValue: 252281164.69731,
        separationValue: 2000000,
        monthlyRate: 0.009488793,
        termLimit: 36,
        initialFeeBasePercentage: 0.3,
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

export default Steps;
