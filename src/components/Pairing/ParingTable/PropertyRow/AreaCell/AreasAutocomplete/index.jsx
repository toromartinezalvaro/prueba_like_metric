import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AreasAutoComplete = ({ areas }) => {
  const getOptions = () => {
    return areas.flatMap((area) => {
      return area.additionalAreas.map((additionalArea) => {
        const { id, nomenclature } = additionalArea;
        return {
          id,
          name: nomenclature || `${area.name} (Sin nomenclatura)`,
        };
      });
    });
  };

  return (
    <Autocomplete
      options={getOptions()}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} fullWidth />}
    />
  );
};

AreasAutoComplete.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      additionalAreas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          nomenclature: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default AreasAutoComplete;
