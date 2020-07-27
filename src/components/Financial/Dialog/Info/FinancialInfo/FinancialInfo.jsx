import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Numbers from '../../../../../helpers/numbers';
import { Divider } from '@material-ui/core';

const FinancialInfo = ({ propertyPrice, m2, financing, paidPrice }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor Apto</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(propertyPrice)}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>m² Vendibles</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(m2)}
                displayType="text"
                suffix=" m²"
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor m²</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(propertyPrice / m2)}
                displayType="text"
                prefix="$ "
                suffix=" /m²"
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider light variant="fullWidth" />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor Financiación</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(financing)}
                displayType="text"
                prefix="$ "
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor a Pagar</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(paidPrice)}
                displayType="text"
                prefix="$ "
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor Mt2</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(paidPrice / m2)}
                displayType="text"
                prefix="$ "
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { propertyPrice, m2 } = state.financial.dialog.root;
  const { financing, paidPrice } = state.financial.dialog.info.info;
  return { propertyPrice, m2, financing, paidPrice };
};

FinancialInfo.propTypes = {
  propertyPrice: PropTypes.number.isRequired,
  m2: PropTypes.number.isRequired,
  financing: PropTypes.number.isRequired,
  paidPrice: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FinancialInfo);
