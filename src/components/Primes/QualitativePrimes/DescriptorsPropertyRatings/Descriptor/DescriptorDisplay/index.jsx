import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import Styles from './DescriptorDisplay.module.scss';

const DescriptorDisplay = ({
  name,
  percentage,
  updateHandler,
  deleteHandler,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.noHover}>
        <div>{name}</div>
        <div>{(percentage * 100).toFixed(2)}%</div>
      </div>
      <div className={Styles.hover}>
        <Button className={Styles.button} onClick={updateHandler}>
          <i className="fas fa-edit"></i>
        </Button>
        <Button className={Styles.button} onClick={deleteHandler}>
          <i className="fas fa-trash-alt"></i>
        </Button>
      </div>
    </div>
  );
};

DescriptorDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  updateHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default DescriptorDisplay;
