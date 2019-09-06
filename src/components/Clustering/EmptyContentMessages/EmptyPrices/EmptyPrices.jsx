import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../UI/Button/Button';
import Icon from '../../../../assets/icons/Icon';
import { DashboardRoutes } from '../../../../routes/local/routes';
import styles from './EmptyPrices.module.scss';

const EmptyPrices = ({ towerId }) => {
  return (
    <div className={styles.container}>
      <p className={styles.p}>
        No se puede agrupar por precio ya que los precios no estan definidos 💰
      </p>
      <Link
        key={'Prices'}
        to={DashboardRoutes.base + DashboardRoutes.areas.value + towerId}
      >
        <Button>
          Vamos a Areas <Icon name="fa-angle-double-right" />
        </Button>
      </Link>
    </div>
  );
};

EmptyPrices.propTypes = {
  towerId: PropTypes.string,
};

export default EmptyPrices;
