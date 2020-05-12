import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Floors from './Floors';
import PropertiesPerFloor from './PropertiesPerFloor';
import LowestFloor from './LowestFloor';
import Stratum from './Stratum';
import EditDialog from './Edit';

const Schema = () => {
  return (
    <>
      <Box mb={2}>
        <Button color="primary" variant="contained" disableElevation>
          Editar
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Floors />
        </Grid>
        <Grid item lg={3}>
          <PropertiesPerFloor />
        </Grid>
        <Grid item lg={3}>
          <LowestFloor />
        </Grid>
        <Grid item lg={3}>
          <Stratum />
        </Grid>
      </Grid>
      <EditDialog />
    </>
  );
};

Schema.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schema);
