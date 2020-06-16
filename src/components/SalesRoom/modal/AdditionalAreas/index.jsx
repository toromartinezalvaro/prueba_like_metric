import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Select from './Select';
import Styles from './AdditionalAreas.module.scss';

const AdditionalAreas = ({
  property,
  additionalAreas,
  addAdditionalAreaHandler,
  deleteAdditionalAreaHandler,
  setAdditionalPrices,
  status,
}) => {
  return (
    <div className={Styles.tableArea}>
      <span className={Styles.title}>Areas Adicionales</span>
      <Table
        property={property}
        deleteAdditionalAreaHandler={deleteAdditionalAreaHandler}
        status={status}
      />
      <Select
        property={property}
        additionalAreas={additionalAreas}
        addAdditionalAreaHandler={addAdditionalAreaHandler}
        setAdditionalPrices={setAdditionalPrices}
      />
    </div>
  );
};

AdditionalAreas.propTypes = {
  property: PropTypes.shape({
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
  deleteAdditionalAreaHandler: PropTypes.func.isRequired,
  setAdditionalPrices: PropTypes.func.isRequired,
};

export default AdditionalAreas;
