import React from 'react';
import moment from 'moment';
import UUIDV4 from 'uuid/v4';
import Typography from '@material-ui/core/Typography';
import PropertyInfo from './PropertyInfo';
import Styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <Typography variant="h3">Cotización</Typography>
        </div>
        <div className={Styles.info}>
          <div className="id">
            <span>ID: </span>
            <span>{UUIDV4()}</span>
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
        <div className={Styles.client}>Client info</div>
        <PropertyInfo />
      </div>
    </>
  );
};

export default Header;
