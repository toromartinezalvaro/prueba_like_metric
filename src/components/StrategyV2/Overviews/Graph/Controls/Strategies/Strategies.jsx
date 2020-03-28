import React, { useContext } from 'react';
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
import Context from '../../../../../../containers/StrategyV2/context';

const Strategies = () => {
  const { state, dispatch } = useContext(Context);

  const group = state.groups[state.selectedGroup];

  const changeStrategyHandler = (event) => {
    dispatch(changeStrategy(Number(event.target.value)));
  };

  const resetStrategyHandler = () => {
    dispatch(changeStrategy(null));
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
              value={group.strategy}
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

export default Strategies;
