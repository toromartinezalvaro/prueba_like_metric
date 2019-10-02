import React from 'react';
import Rating from './Rating';
import Styles from './Ratings.module.scss';

const Ratings = ({ ratings, addRatingHandler, deleteRatingHandler }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <div className={Styles.title}>
          <span>Calificaciones</span>
        </div>
        <div className={Styles.actions}>
          <button className={Styles.button} onClick={addRatingHandler}>
            Agregar calificación
          </button>
          <button className={Styles.button} onClick={deleteRatingHandler}>
            Eliminar calificación
          </button>
        </div>
      </div>
      <div className={Styles.ratings}>
        {ratings.map((rating, index) => {
          return <Rating key={`rating-${index}`} rating={rating} />;
        })}
      </div>
    </div>
  );
};

export default Ratings;
