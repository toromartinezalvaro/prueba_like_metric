import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

const AreasSelect = ({ areas, selectedArea, selectedAreaHandler }) => {
  return (
    <div>
      <Select
        value={selectedArea}
        displayEmpty
        onChange={(event) => {
          selectedAreaHandler(event.target.value);
        }}
      >
        <MenuItem value="" disabled>
          Seleccione un area
        </MenuItem>
        {areas.flatMap((area) => {
          return [
            <ListSubheader key={`additionalAreaOption-${area.id}`}>
              {area.name}
            </ListSubheader>,
            area.additionalAreas.map((additionalArea) => {
              const { id, nomenclature } = additionalArea;
              return (
                <MenuItem key={`option-${id}`} value={id}>
                  {`${area.name}`} {nomenclature || '(Sin nomenclatura)'}
                </MenuItem>
              );
            }),
          ];
        })}
      </Select>
    </div>
  );
};

AreasSelect.propTypes = {
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
  selectedArea: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  selectedAreaHandler: PropTypes.func.isRequired,
};

export default AreasSelect;
