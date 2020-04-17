import React from 'react';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './StepIcon.module.scss';

const StepIcon = ({ active, completed, icon }) => {
  const icons = {
    1: <Icon className="fas fa-layer-group" />,
    2: <Icon className={`fas fa-sitemap ${styles.itemIcon}`} />,
  };

  return (
    <div
      className={`${styles.componentRoot}
        ${active && styles.componentActive}
        ${completed && styles.componentCompleted}`}
    >
      {icons[String(icon)]}
    </div>
  );
};
StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};
export default StepIcon;
