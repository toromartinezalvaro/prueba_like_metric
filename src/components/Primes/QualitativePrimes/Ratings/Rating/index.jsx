import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../UI/Input/Input';
import Styles from './Rating.module.scss';

const Rating = ({
  rating: { id, rate, m2Prime, unitPrime },
  updateRatingHandler,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <span>Calificación: </span>
        <span className={Styles.value}>{rate}</span>
      </div>
      <div className={Styles.primes}>
        <div className={Styles.prime}>
          <div className={Styles.title}>
            <span>m²:</span>
          </div>
          <div className={Styles.value}>
            <Input
              mask="currency"
              useInternalState
              value={m2Prime}
              validations={[]}
              onChange={(event) => {
                const ratingData = {
                  m2Prime: parseFloat(event.value),
                  unitPrime,
                };
                updateRatingHandler(id, ratingData);
              }}
            />
          </div>
        </div>
        <div className={Styles.prime}>
          <div className={Styles.title}>
            <span>Unidad:</span>
          </div>
          <div className={Styles.value}>
            <Input
              mask="currency"
              useInternalState
              value={unitPrime}
              validations={[]}
              onChange={(event) => {
                const ratingData = {
                  m2Prime,
                  unitPrime: parseFloat(event.value),
                };
                updateRatingHandler(id, ratingData);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.shape({
    id: PropTypes.number,
    rate: PropTypes.number,
    m2Prime: PropTypes.number,
    unitPrime: PropTypes.number,
  }),
  updateRatingHandler: PropTypes.func.isRequired,
};

export default Rating;