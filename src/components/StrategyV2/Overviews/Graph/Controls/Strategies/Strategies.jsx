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

const Strategies = ({ strategy, onChangeStrategy }) => {
  const changeStrategyHandler = (event) => {
    onChangeStrategy(Number(event.target.value));
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
                control={<Radio />}
                label="Continua"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Semi-continua"
              />
              <FormControlLabel
                value={9}
                disabled
                control={<Radio />}
                label="Semi-escalonada"
              />
              <FormControlLabel
                value={18}
                disabled
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
        >
          Reiniciar estrategia
        </Button>
      </Box>
    </Paper>
  );
};

Strategies.propTypes = {
  strategy: PropTypes.number.isRequired,
  onChangeStrategy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { strategy } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return { strategy };
};

const mapDispatchToProps = {
  onChangeStrategy: changeStrategy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategies);
