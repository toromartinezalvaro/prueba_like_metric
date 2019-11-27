import React from 'react';
import PropTypes from 'prop-types';
import Styles from './SummaryTable.module.scss';

const SummaryTable = ({ properties }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.some}>
        <div className={Styles.title}>Apareados</div>
        <div className={Styles.value}>
          {
            properties.filter((property) => {
              return property.additionalAreas.length > 0;
            }).length
          }
        </div>
      </div>
      <div className={Styles.some}>
        <div className={Styles.title}>Libres</div>
        <div className={Styles.value}>
          {
            properties.filter((property) => {
              return property.additionalAreas.length === 0;
            }).length
          }
        </div>
      </div>
      <div className={Styles.some}>
        <div className={Styles.title}>Total</div>
        <div className={Styles.value}>{properties.length}</div>
      </div>
    </div>
  );
};

SummaryTable.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      additionalAreas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          areaType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  ).isRequired,
};

export default SummaryTable;
