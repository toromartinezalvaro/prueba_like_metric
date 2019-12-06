import React from 'react';
import PropTypes from 'prop-types';
import Styles from './HoverContainer.module.scss';

const HoverContainer = ({ hover, noHover }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.noHover}>{noHover}</div>
      <div className={Styles.hover}>{hover}</div>
    </div>
  );
};

HoverContainer.propTypes = {
  hover: PropTypes.node.isRequired,
  noHover: PropTypes.node.isRequired,
};

export default HoverContainer;
