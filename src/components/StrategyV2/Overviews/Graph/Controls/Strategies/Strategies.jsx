import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const Strategies = () => {
  return (
    <Paper>
      <Box p={3}>
        <Box mb={2}>
          <Typography variant="h5">Estrategias</Typography>
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Seleccione una estrategia:</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Continua"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Semi-continua"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="Semi-escalonada"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button color="secondary" variant="contained" fullWidth>
          Reiniciar estrategia
        </Button>
      </Box>
    </Paper>
  );
};

export default Strategies;
