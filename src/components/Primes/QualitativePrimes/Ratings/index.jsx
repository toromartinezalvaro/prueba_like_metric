import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../UI2/Button';
import Rating from './Rating';
import Styles from './Ratings.module.scss';

const Ratings = ({
  ratings,
  addRatingHandler,
  removeRatingHandler,
  updateRatingHandler,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <div className={Styles.title}>
          <span>Calificaciones</span>
        </div>
        <div className={Styles.actions}>
          <Button onClick={addRatingHandler}>Agregar calificación</Button>
          <Button onClick={removeRatingHandler}>Eliminar calificación</Button>
        </div>
      </div>
      <div className={Styles.ratings}>
        {ratings.map((rating, index) => {
          return (
            <Rating
              key={`rating-${index}`}
              rating={rating}
              updateRatingHandler={updateRatingHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

Ratings.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      m2Prime: PropTypes.number,
      unitPrime: PropTypes.number,
    }),
  ),
  addRatingHandler: PropTypes.func.isRequired,
  removeRatingHandler: PropTypes.func.isRequired,
  updateRatingHandler: PropTypes.func.isRequired,
};

export default Ratings;
