import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ClientInfo.module.scss';

const ClientInfo = ({ client }) => {
  return (
    <div>
      <div className={Styles.infoContainer}>
        <div>
          <span>Nombre:</span>
        </div>
        <div>
          <span>{client.name}</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div>
          <span>Documento de identidad:</span>
        </div>
        <div>
          <span>{client.identityDocument}</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div>
          <span>Correo:</span>
        </div>
        <div>
          <span>{client.email}</span>
        </div>
      </div>
    </div>
  );
};

ClientInfo.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    identityDocument: PropTypes.string,
    email: PropTypes.string,
  }),
};

ClientInfo.defaultProps = {
  client: {
    name: '',
    identityDocument: '',
    email: '',
  },
};

export default ClientInfo;
