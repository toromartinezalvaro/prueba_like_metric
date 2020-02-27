import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import PropertyInfo from './PropertyInfo';
import ClientInfo from './ClientInfo';
import Styles from './Header.module.scss';

const Header = ({ quotation }) => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <Typography variant="h3">Cotización</Typography>
        </div>
        <div className={Styles.info}>
          <div className="id">
            <span>ID: </span>
            <span>{quotation.id}</span>
          </div>
          <div className="date">
            <span>Fecha:</span>{' '}
            <span>
              {moment()
                .format('DD/MM/YYYY')
                .toString()}
            </span>
          </div>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.client}>
          <ClientInfo client={quotation.client} />
        </div>
        <PropertyInfo
          property={quotation.property}
          propertyPrice={quotation.propertyPrice}
          initialFeePercentage={quotation.initialFeePercentage}
          reservePercentage={quotation.reservePercentage}
          periods={quotation.periods}
        />
      </div>
    </>
  );
};

Header.propTypes = {
  quotation: PropTypes.shape({
    id: PropTypes.string,
    propertyPrice: PropTypes.number,
    initialFeePercentage: PropTypes.number,
    reservePercentage: PropTypes.number,
    periods: PropTypes.number,
    paymentStartDate: PropTypes.string,
    property: PropTypes.shape({
      name: PropTypes.string,
    }),
    client: PropTypes.shape({
      identityDocument: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Header;
