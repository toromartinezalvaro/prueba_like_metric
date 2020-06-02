import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import AreasSelect from './AreasSelect';
import Styles from './AreaForm.module.scss';

const AreaForm = ({ areas, isEditingHandler, addAreaHandler, status }) => {
  const [selectedArea, setSelectedArea] = useState('');

  return (
    <div className={Styles.editingContainer}>
      <div className={Styles.autocompleteContainer}>
        <AreasSelect
          areas={areas}
          selectedArea={selectedArea}
          selectedAreaHandler={setSelectedArea}
        />
      </div>
      <Button
        disabled={selectedArea === ''}
        onClick={() => {
          isEditingHandler(false);
          addAreaHandler(selectedArea);
        }}
      >
        <i className="fas fa-check"></i>
      </Button>
      <Button
        onClick={() => {
          isEditingHandler(false);
          setSelectedArea('');
        }}
      >
        <i className="fas fa-times"></i>
      </Button>
    </div>
  );
};

AreaForm.propTypes = {
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
  isEditingHandler: PropTypes.func.isRequired,
  addAreaHandler: PropTypes.func.isRequired,
};

export default AreaForm;
