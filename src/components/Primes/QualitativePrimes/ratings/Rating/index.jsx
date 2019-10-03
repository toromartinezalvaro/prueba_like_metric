import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../UI2/Input';
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
            {/* TODO: Devolver numeros no strings */}
            <Input
              useInternalState
              value={m2Prime}
              onBlur={(event) => {
                const ratingData = {
                  m2Prime: event.target.value,
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
              useInternalState
              value={unitPrime}
              onBlur={(event) => {
                const ratingData = {
                  m2Prime,
                  unitPrime: event.target.value,
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
