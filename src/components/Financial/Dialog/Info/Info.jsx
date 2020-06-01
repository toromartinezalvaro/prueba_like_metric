import React from 'react';
import Grid from '@material-ui/core/Grid';
import Step from '../Step';
import FinancialInfo, { Title as FinancialInfoTitle } from './FinancialInfo';
import InitialFee, { Title as InitialFeeTitle } from './InitialFee';
import ExtraFees, { Title as ExtraFeesTitle } from './ExtraFees';
import BankCredit, { Title as BankCreditTitle } from './BankCredit';
// import Dates, { Title as DatesTitle } from './Dates';

const Info = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Step title={<FinancialInfoTitle />}>
          <FinancialInfo />
        </Step>
      </Grid>
      <Grid item xs={12}>
        <Step title={<InitialFeeTitle />}>
          <InitialFee />
        </Step>
      </Grid>
      <Grid item xs={12}>
        <Step title={<ExtraFeesTitle />}>
          <ExtraFees />
        </Step>
      </Grid>
      <Grid item xs={12}>
        <Step title={<BankCreditTitle />}>
          <BankCredit />
        </Step>
      </Grid>
      {/* <Grid item xs={12}>
        <Step title={<DatesTitle />}>
          <Dates />
        </Step>
      </Grid> */}
    </Grid>
  );
};

export default Info;
