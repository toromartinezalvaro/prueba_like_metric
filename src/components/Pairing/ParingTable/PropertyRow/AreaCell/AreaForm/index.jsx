import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import AreasSelect from './AreasSelect';
import Styles from './AreaForm.module.scss';

const AreaForm = ({ areas, isEditingHandler, addAreaHandler, status }) => {
  const [selectedArea, setSelectedArea] = useState('');

  const saveSelection = () => {
    isEditingHandler(false);
    addAreaHandler(selectedArea);
  };

  const useArea = (e) => {
    if (e.key === 'Enter') {
      saveSelection();
    }
  };

  return (
    <div className={Styles.editingContainer}>
      <div className={Styles.autocompleteContainer}>
        <AreasSelect
          areas={areas}
          selectedArea={selectedArea}
          selectedAreaHandler={setSelectedArea}
          useArea={useArea}
        />
      </div>
      <Button disabled={selectedArea === ''} onClick={saveSelection}>
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
