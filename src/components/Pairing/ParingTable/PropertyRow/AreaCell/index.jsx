import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import HoverContainer, { options } from './HoverContainer';
import AreaForm from './AreaForm';
import Styles from './AreaCell.module.scss';

const AreaCell = ({ areas, area, addAreaHandler, removeAreaHandler }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <TableCell>
      <div className={Styles.container}>
        {isEditing ? (
          <AreaForm
            areas={areas}
            isEditingHandler={setIsEditing}
            addAreaHandler={addAreaHandler}
          />
        ) : (
          <HoverContainer
            updateHandler={() => {
              setIsEditing(true);
            }}
            removeAreaHandler={() => {
              setIsEditing(false);
              removeAreaHandler(area.id);
            }}
            option={area ? options.DELETE : options.EDIT}
          >
            <span>
              {area
                ? `${area.areaType.name} - ${area.nomenclature}`
                : 'Sin area'}
            </span>
          </HoverContainer>
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
  area: PropTypes.shape({
    id: PropTypes.number,
    nomenclature: PropTypes.string,
    areaType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  addAreaHandler: PropTypes.func.isRequired,
  removeAreaHandler: PropTypes.func.isRequired,
};

export default AreaCell;
