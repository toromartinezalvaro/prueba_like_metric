import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Button from '../../../../UI2/Button';
import EditableContainer from './EditableContainer';
import AreasAutoComplete from './AreasAutocomplete';
import Styles from './AreaCell.module.scss';

const AreaCell = ({ areas }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <TableCell>
      <div className={Styles.container}>
        {isEditing ? (
          <div className={Styles.editingContainer}>
            <div className={Styles.autocompleteContainer}>
              <AreasAutoComplete areas={areas} />
            </div>
            <Button>
              <i className="fas fa-check"></i>
            </Button>
            <Button>
              <i className="fas fa-times"></i>
            </Button>
          </div>
        ) : (
          <EditableContainer
            updateHandler={() => {
              setIsEditing(true);
            }}
          >
            <span>Texto base</span>
          </EditableContainer>
        )}
      </div>
    </TableCell>
  );
};

AreaCell.propTypes = {
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

export default AreaCell;
