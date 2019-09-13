import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './TotalIncrement.module.scss';

function TotalIncrement({ data }) {
  return (
    <div>
      <div>
        <span>Incremento total</span>
      </div>
      <div>
        <NumberFormat
          value={data
            .reduce((current, next) => current + next.increment, 0)
            .toFixed(2)}
          displayType={'text'}
          prefix={'$'}
          thousandSeparator={true}
        />
      </div>
    </div>
  );
}

TotalIncrement.propTypes = {
  data: PropTypes.array,
};

TotalIncrement.defaultProps = {
  data: [],
};

export default TotalIncrement;
