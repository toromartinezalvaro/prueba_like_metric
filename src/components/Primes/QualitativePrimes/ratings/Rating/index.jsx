import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../UI2/Input';
import Styles from './Rating.module.scss';

const Rating = ({ rating }) => {
  return (
    <div className={Styles.rating}>
      <div className={Styles.header}>
        <span>Calificación: </span>
        <span className={Styles.value}>{rating.rate}</span>
      </div>
      <div className={Styles.ratingPrimes}>
        <div className={Styles.ratingPrime}>
          <div className={Styles.primeTitle}>
            <span>m²:</span>
          </div>
          <div className={Styles.primeValue}>
            <Input value={rating.m2Prime} />
          </div>
        </div>
        <div className={Styles.ratingPrime}>
          <div className={Styles.primeTitle}>
            <span>Unidad:</span>
          </div>
          <div className={Styles.primeValue}>
            <Input
              validations={[]}
              Change={() => null}
              value={rating.unitPrime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.any,
};

export default Rating;
