import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import BudgetChart, {
  actions as budgetChartActions,
} from '../../components/Budget/Chart';
import BudgetDistribution, {
  actions as budgetDistributionActions,
} from '../../components/Budget/Distribution';
import BudgetServices from '../../services/budget';

const services = new BudgetServices();

const Budget = ({
  setChartData,
  setDistributionData,
  units,
  salesStartDate,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await services.getBudget(towerId);
        const { chart, ...distribution } = response.data;
        setChartData(chart);
        setDistributionData(distribution);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
    fetch();
  }, []);

  const validateDistributionError = (distribution) => {
    const currentUnits = distribution.reduce((acc, val) => acc + val);
    console.log({ units, currentUnits });
    if (currentUnits === units) {
      return false;
    }
    const errorMessage =
      currentUnits < units
        ? `Se deben asignar todas las unidades, faltan ${units - currentUnits}`
        : `Las unidades no pueden ser mayor a ${units}`;
    enqueueSnackbar(errorMessage, {
      variant: 'error',
    });

    return true;
  };

  const putDistribution = async (values) => {
    const distribution = values.distribution.map(Number);
    if (validateDistributionError(distribution)) {
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
          <BudgetDistribution
            units={units}
            salesStartDate={Number(salesStartDate)}
            submitHandler={putDistribution}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Budget.propTypes = {
  setChartData: PropTypes.func.isRequired,
  setDistributionData: PropTypes.func.isRequired,
  units: PropTypes.number.isRequired,
  salesStartDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const mapStateToProps = (state) => ({
  units: state.budget.distribution.units,
  salesStartDate: state.budget.distribution.salesStartDate,
});

const mapDispatchToProps = {
  setChartData: budgetChartActions.setBudgetChartData,
  setDistributionData: budgetDistributionActions.setBudgetDistributionData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Budget);
