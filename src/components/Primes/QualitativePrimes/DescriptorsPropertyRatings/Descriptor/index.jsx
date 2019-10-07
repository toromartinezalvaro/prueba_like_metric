import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DescriptorEdit from './DescriptorEdit';
import DescriptorDisplay from './DescriptorDisplay';

const Descriptor = ({
  descriptor: { id, name, percentage },
  descriptorUpdateHandler,
  removeDescriptorHandler,
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

  const handleDelete = () => {
    removeDescriptorHandler(id, descriptorData);
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
    tempDescriptorData.percentage = event.target.value;
    setDescriptorData(tempDescriptorData);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div>
      {isEditable ? (
        <DescriptorEdit
          name={descriptorData.name}
          percentage={descriptorData.percentage}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          handleNameChange={handleNameChange}
          handlePercentageChange={handlePercentageChange}
        />
      ) : (
        <DescriptorDisplay
          name={name}
          percentage={percentage}
          updateHandler={handleEdit}
          deleteHandler={handleDelete}
        />
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
  removeDescriptorHandler: PropTypes.func.isRequired,
};

export default Descriptor;
