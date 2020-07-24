import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import BudgetChart, {
  actions as budgetChartActions,
} from '../../components/Budget/Chart';
import BudgetDistribution from '../../components/Budget/Distribution';
import BudgetServices from '../../services/budget';

const services = new BudgetServices();

const Budget = ({ setChartData }) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await services.getBudget(towerId);
        setChartData(response.data);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
    fetch();
  }, []);

  const putDistribution = async (values) => {
    const distribution = values.distribution.map(Number);
    alert(distribution);
    if (distribution.reduce((acc, val) => acc + val) !== 94) {
      enqueueSnackbar('Se deben asignar todas las unidades', {
        variant: 'error',
      });
      return false;
    }
    try {
      await services.putBudget(towerId, { saleSpeed: 0, distribution });
      enqueueSnackbar('Presupuesto guardado', { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      return false;
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BudgetChart />
        </Grid>
        <Grid item xs={12}>
          <BudgetDistribution units={94} submitHandler={putDistribution} />
        </Grid>
      </Grid>
    </div>
  );
};

Budget.propTypes = {
  setChartData: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setChartData: budgetChartActions.setBudgetChartData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Budget);
