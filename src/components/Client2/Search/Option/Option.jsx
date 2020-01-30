import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Option.module.scss';

const Option = ({ value }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.icon}>
        <i className="fas fa-user"></i>
      </div>
      <div className={Styles.client}>
        <span className={Styles.name}>{value.name}</span>
        <span className={Styles.identityDocument}>
          {value.identityDocument}
        </span>
      </div>
    </div>
  );
};

Option.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    identityDocument: PropTypes.number,
  }).isRequired,
};

export default Option;
