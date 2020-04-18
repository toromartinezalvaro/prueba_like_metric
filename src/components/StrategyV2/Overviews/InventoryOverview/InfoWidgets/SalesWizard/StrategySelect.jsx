import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const StrategySelect = ({ field, units, ...rest }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Estrategia</InputLabel>
      <Select {...field} {...rest} label="Estrategia">
        <MenuItem value={1}>Continua</MenuItem>
        <MenuItem value={3} disabled={units < 3}>
          Semi-continua
        </MenuItem>
        <MenuItem value={9} disabled={units < 9}>
          Semi-escalonada
        </MenuItem>
        <MenuItem value={18} disabled={units < 18}>
          Esalonada
        </MenuItem>
      </Select>
    </FormControl>
  );
};

StrategySelect.propTypes = {
  units: PropTypes.number.isRequired,
};

export default StrategySelect;
