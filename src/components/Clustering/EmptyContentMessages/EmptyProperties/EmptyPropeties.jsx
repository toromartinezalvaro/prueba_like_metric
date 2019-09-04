import React from 'react';
import PropTypes from 'prop-types';
import { DashboardRoutes } from '../../../../routes/local/routes';
import EmptyContentMessageView from '../../../UI/EmptyContentMessageView';

const EmptyProperties = ({ towerId }) => {
  return (
    <EmptyContentMessageView
      title="Vamos a crear apartamentos 🏢!"
      message="Para poder agrupar primero debes tener apartamentos."
      buttonsContent={[
        {
          title: 'Creemos apartamentos',
          url: DashboardRoutes.base + DashboardRoutes.building.value + towerId,
        },
      ]}
    />
  );
};

EmptyProperties.propTypes = {
  towerId: PropTypes.string,
};

export default EmptyProperties;
