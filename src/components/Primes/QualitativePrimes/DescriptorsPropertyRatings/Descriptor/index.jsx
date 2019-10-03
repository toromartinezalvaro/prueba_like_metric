import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../UI2/Input';
import Button from '../../../../UI2/Button';
import Styles from './Descriptor.module.scss';

const Descriptor = ({
  descriptor: { id, name, percentage },
  descriptorUpdateHandler,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [descriptorData, setDescriptorData] = useState({});

  useEffect(() => {
    setDescriptorData({ name, percentage });
  }, [name, percentage]);

  const handleUpdate = () => {
    setIsEditable(false);
    descriptorUpdateHandler(id, descriptorData);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setDescriptorData({ name, percentage });
  };

  const handleNameChange = (event) => {
    const tempDescriptorData = { ...descriptorData };
    tempDescriptorData.name = event.target.value;
    setDescriptorData(tempDescriptorData);
  };

  const handlePercentageChange = (event) => {
    const tempDescriptorData = { ...descriptorData };
    tempDescriptorData.percentage = parseFloat(event.target.value) / 100;
    setDescriptorData(tempDescriptorData);
  };

  return (
    <div
      onDoubleClick={() => {
        setIsEditable(true);
      }}
    >
      {isEditable ? (
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
            value={descriptorData.name}
            onChange={handleNameChange}
          />
          <Input
            className={Styles.input}
            mask="percentage"
            value={descriptorData.percentage * 100}
            onChange={handlePercentageChange}
          />
        </div>
      ) : (
        <Fragment>
          <div>{name}</div>
          <div>{(percentage * 100).toFixed(2)}%</div>
        </Fragment>
      )}
    </div>
  );
};

Descriptor.propTypes = {
  descriptor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    percentage: PropTypes.number,
  }).isRequired,
  descriptorUpdateHandler: PropTypes.func.isRequired,
};

export default Descriptor;
