import React from 'react';
import Input from '../../../UI/Input/Input';
import Styles from './Ratings.module.scss';

const Ratings = () => {
  return (
    <div className={Styles.ratings}>
      <div className={Styles.ratingsTitle}>
        <span>Calificaciones</span>
      </div>
      <div className={Styles.rating}>
        <div className={Styles.ratingHeader}>
          <span>Calificación: </span>
          <span>1</span>
        </div>
        <div className={Styles.ratingPrimes}>
          <div className={Styles.ratingPrime}>
            <div className={Styles.primeTitle}>
              <span>m²:</span>
            </div>
            <div className={Styles.primeValue}>
              <Input
                style={{ padding: 0 }}
                validations={[]}
                Change={() => null}
              />
            </div>
          </div>
          <div className={Styles.ratingPrime}>
            <div className={Styles.primeTitle}>
              <span>Unidad:</span>
            </div>
            <div className={Styles.primeValue}>
              <Input
                style={{ padding: 0 }}
                validations={[]}
                Change={() => null}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.rating}>
        <div className={Styles.ratingHeader}>
          <span>Calificación: </span>
          <span>2</span>
        </div>
        <div className={Styles.ratingPrimes}>
          <div className={Styles.ratingPrime}>
            <div className={Styles.primeTitle}>
              <span>m²:</span>
            </div>
            <div className={Styles.primeValue}>
              <Input
                style={{ padding: 0 }}
                validations={[]}
                Change={() => null}
              />
            </div>
          </div>
          <div className={Styles.ratingPrime}>
            <div className={Styles.primeTitle}>
              <span>Unidad:</span>
            </div>
            <div className={Styles.primeValue}>
              <Input
                style={{ padding: 0 }}
                validations={[]}
                Change={() => null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
