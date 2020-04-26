import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { DashboardRoutes } from '../../../routes/local/routes';
import EmptyContentMessageView from '../../UI/EmptyContentMessageView';
import Styles from './Message.module.scss';

const EmptyProperties = () => {
  const { towerId } = useParams();

  return (
    <div className={Styles.Container}>
      <EmptyContentMessageView
        title="Vamos a crear grupos 📚!"
        message="Para poder ingresar a estrategias primero debes agrupar tus apartamentos."
        buttonsContent={[
          {
            title: 'Creemos grupos',
            url:
              DashboardRoutes.base + DashboardRoutes.clustering.value + towerId,
          },
        ]}
      />
    </div>
  );
};

EmptyProperties.propTypes = {
  towerId: PropTypes.string,
};

export default EmptyProperties;
