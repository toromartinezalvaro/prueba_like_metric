import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import Input from '../../../../../UI2/Input';
import Styles from './DescriptorEdit.module.scss';

const DescriptorEdit = ({
  name,
  percentage,
  handleUpdate,
  handleCancel,
  handleNameChange,
  handlePercentageChange,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.actions}>
        <Button className={Styles.button} onClick={handleUpdate}>
          <i className="fas fa-check"></i>
        </Button>
        <Button className={Styles.button} onClick={handleCancel}>
          <i className="fas fa-times"></i>
        </Button>
      </div>
      <Input
        className={Styles.input}
        value={name}
        onChange={handleNameChange}
      />
      <Input
        className={Styles.input}
        mask="percentage"
        value={percentage}
        onChange={handlePercentageChange}
      />
    </div>
  );
};

DescriptorEdit.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handlePercentageChange: PropTypes.func.isRequired,
};

export default DescriptorEdit;
