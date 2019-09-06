import React from 'react';
import PropTypes from 'prop-types';
import { DashboardRoutes } from '../../../../routes/local/routes';
import EmptyContentMessageView from '../../../UI/EmptyContentMessageView';

const EmptyAreasAndPrices = ({ towerId }) => {
  return (
    <EmptyContentMessageView
      title="Vamos a agregar areas 📏 y precios 💰!"
      message="Para poder agrupar primero debes tener areas y precios."
      buttonsContent={[
        {
          title: 'Creemos areas',
          url: DashboardRoutes.base + DashboardRoutes.areas.value + towerId,
        },
      ]}
    />
  );
};

EmptyAreasAndPrices.propTypes = {
  towerId: PropTypes.string,
};

export default EmptyAreasAndPrices;
