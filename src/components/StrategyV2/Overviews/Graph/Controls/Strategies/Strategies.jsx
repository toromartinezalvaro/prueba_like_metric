import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { changeStrategy } from '../../../../../../containers/StrategyV2/actions';
import StrategyServices from '../../../../../../services/strategy/StrategyService';

const Strategies = ({
  strategy,
  onChangeStrategy,
  isReset,
  strategies,
  currentGroup,
}) => {
  const services = new StrategyServices();

  const changeStrategyHandler = (event) => {
    const id = event.target.value;
    onChangeStrategy(Number(id));
    const lineSelected = strategies.find((s) => s.id === Number(id));
    services.putStrategy({
      id: currentGroup.id,
      strategy: Number(id),
      incrementList: lineSelected.percentage,
      arrayIncrementList: [],
    });
  };

  const resetStrategyHandler = () => {
    onChangeStrategy(null);
  };

  return (
    <Paper>
      <Box p={3}>
        <Box mb={2}>
          <Typography variant="h5">Estrategias</Typography>
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Seleccione una estrategia:</FormLabel>
            <RadioGroup
              row
              aria-label="estrategia"
              value={strategy}
              onChange={changeStrategyHandler}
            >
              <FormControlLabel
                value={1}
                disabled={!(strategies && strategies.length >= 2) || !isReset}
                control={<Radio />}
                label="Continua"
              />
              <FormControlLabel
                value={3}
                disabled={!(strategies && strategies.length >= 3) || !isReset}
                control={<Radio />}
                label="Semi-continua"
              />
              <FormControlLabel
                value={9}
                disabled={!(strategies && strategies.length >= 4) || !isReset}
                control={<Radio />}
                label="Semi-escalonada"
              />
              <FormControlLabel
                value={18}
                disabled={!(strategies && strategies.length >= 5) || !isReset}
                control={<Radio />}
                label="Escalonada"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={resetStrategyHandler}
          fullWidth
          disabled={isReset}
        >
          Reiniciar estrategia
        </Button>
      </Box>
    </Paper>
  );
};

Strategies.propTypes = {
  strategies: PropTypes.array.isRequired,
  isReset: PropTypes.bool.isRequired,
  strategy: PropTypes.number.isRequired,
  onChangeStrategy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const currentGroup =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  const { strategy, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];

  return {
    strategy,
    isReset,
    strategies: currentGroup ? currentGroup.strategies : null,
    currentGroup,
  };
};

const mapDispatchToProps = {
  onChangeStrategy: changeStrategy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategies);
