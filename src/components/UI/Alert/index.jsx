import React from 'react';
import PropTypes from 'prop-types';
import Types from './Types.config';
import Styles from './styles.module.scss';

function Alert({ close, type, title, children }) {
  return (
    <div className={`${Styles.container} ${Styles[type]}`}>
      <div className={Styles.iconContent}>
        <i className={`fas ${Types[type].icon}`} onClick={close}></i>
      </div>
      <div className={Styles.messageContainer}>
        <div className={Styles.titleContainer}>
          <div className={Styles.title}>
            {title !== undefined ? title : Types[type].title}
          </div>
          <div className={`${Styles.icon} fas fa-times`} onClick={close} />
        </div>
        <div className={Styles.description}>{children}</div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  close: PropTypes.func.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {
  type: 'default',
};

export default Alert;
