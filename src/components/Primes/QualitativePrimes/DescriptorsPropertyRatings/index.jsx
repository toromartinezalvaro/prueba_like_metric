import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Table from '../../../UI/Table/Table';
import Button from '../../../UI2/Button';
import Descriptor from './Descriptor';

const DescriptorsPropertyRatings = ({
  descriptors,
  addDescriptorHandler,
  descriptorUpdateHandler,
}) => {
  const makeHeaders = () => {
    const headers = descriptors.map((descriptor, index) => {
      return (
        <Descriptor
          key={`descriptor-${index}`}
          descriptor={descriptor}
          addDescriptorHandler={addDescriptorHandler}
          descriptorUpdateHandler={descriptorUpdateHandler}
        />
      );
    });
    headers.push(<Button onClick={addDescriptorHandler}>Boton</Button>);
    return headers;
  };

  return (
    <div>
      <Table
        intersect="Nomenclatura"
        headers={makeHeaders()}
        columns={['Column 1']}
        data={[
          [
            <Select
              options={[{ value: 1, label: '1' }, { value: 2, label: '2' }]}
            />,
          ],
        ]}
      />
    </div>
  );
};

DescriptorsPropertyRatings.propTypes = {
  descriptors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      percentage: PropTypes.number,
    }),
  ).isRequired,
  addDescriptorHandler: PropTypes.func.isRequired,
  descriptorUpdateHandler: PropTypes.func.isRequired,
};

export default DescriptorsPropertyRatings;
