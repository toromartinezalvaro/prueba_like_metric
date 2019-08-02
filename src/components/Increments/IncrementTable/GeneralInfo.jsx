import React from 'react';
import PropTypes from 'prop-types';

function GeneralInfo({ units, averageArea, averagePrice }) {
  return <div></div>;
}

GeneralInfo.propTypes = {
  units: PropTypes.number,
  averageArea: PropTypes.number,
  averagePrice: PropTypes.averagePrice,
};

GeneralInfo.defaultProps = {
  units: 0,
  averageArea: 0,
  averagePrice: 0,
};

export default GeneralInfo;
