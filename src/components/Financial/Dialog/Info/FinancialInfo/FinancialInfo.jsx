import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const FinancialInfo = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor Apto</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 252,281,165</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>m² Vendibles</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>62.6 m²</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor Financiación</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 78,611,307</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor a Pagar</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 330,892,472</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FinancialInfo;
