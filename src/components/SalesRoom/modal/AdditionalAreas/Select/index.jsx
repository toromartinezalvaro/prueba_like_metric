import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MUISelect from '@material-ui/core/Select';
import Button from '../../../../UI2/Button';
import Styles from './Select.module.scss';

const Select = ({ property, additionalAreas, addAdditionalAreaHandler }) => {
  const [selectedArea, setSelectedArea] = useState('');
  const [addingArea, setAddingArea] = useState(false);

  return (
    <div className={Styles.container}>
      {addingArea ? (
        <div>
          <MUISelect
            value={selectedArea}
            displayEmpty
            onChange={(event) => {
              setSelectedArea(event.target.value);
            }}
          >
            <MenuItem value="" disabled>
              Seleccione un area adicional
            </MenuItem>
            {additionalAreas.map((additionalArea) => {
              return (
                <MenuItem value={additionalArea.id} key={additionalArea.id}>
                  {additionalArea.areaType.name}-
                  {additionalArea.nomenclature || '(Sin nomenclatura)'}
                </MenuItem>
              );
            })}
          </MUISelect>
          <Button
            onClick={() => {
              setSelectedArea('');
              setAddingArea(false);
              addAdditionalAreaHandler(selectedArea);
            }}
          >
            <i className="fas fa-check"></i>
          </Button>
          <Button
            onClick={() => {
              setSelectedArea('');
              setAddingArea(false);
            }}
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            setAddingArea(true);
          }}
        >
          Agregar un area adicional
        </Button>
      )}
    </div>
  );
};

Select.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    additionalAreas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        measure: PropTypes.number,
        price: PropTypes.number,
        nomenclature: PropTypes.string,
        areaType: PropTypes.shape({
          name: PropTypes.string,
          unit: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
  additionalAreas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nomenclature: PropTypes.string,
      areaType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  addAdditionalAreaHandler: PropTypes.func.isRequired,
};

export default Select;
