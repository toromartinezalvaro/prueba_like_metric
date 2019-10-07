import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import Table from '../../../UI/Table/Table';
import Button from '../../../UI2/Button';
import Descriptor from './Descriptor';

const DescriptorsPropertyRatings = ({
  ratings,
  properties,
  descriptors,
  propertiesRatings,
  addDescriptorHandler,
  descriptorUpdateHandler,
  removeDescriptorHandler,
  addPropertyRatingHandler,
}) => {
  const makeHeaders = () => {
    const headers = descriptors.map((descriptor, index) => {
      return (
        <Descriptor
          key={`descriptor-${index}`}
          descriptor={descriptor}
          addDescriptorHandler={addDescriptorHandler}
          descriptorUpdateHandler={descriptorUpdateHandler}
          removeDescriptorHandler={removeDescriptorHandler}
        />
      );
    });
    headers.push(
      <Button onClick={addDescriptorHandler}>
        <i className="fas fa-plus"></i>
      </Button>,
    );
    return headers;
  };

  const makeColumns = () => {
    return properties.map((property, index) => {
      return (
        <div key={`propertyColumn-${index}`}>
          <span>{property.name}</span>
        </div>
      );
    });
  };

  const makeCells = () => {
    const matrix = properties.map((property, i) => {
      const propertyIndex = _.findIndex(
        propertiesRatings,
        (o) => o.id === property.id,
      );
      return descriptors.map((descriptor, j) => {
        const descriptorIndex = _.findIndex(
          propertiesRatings[propertyIndex].qualitativePrimesDescriptors,
          (o) => o.id === descriptor.id,
        );
        return (
          <Select
            key={`rating-${i}-${j}`}
            options={ratings.map((rating) => ({
              value: rating.rate,
              label: rating.rate,
            }))}
            value={
              descriptorIndex !== -1
                ? {
                    value:
                      propertiesRatings[propertyIndex]
                        .qualitativePrimesDescriptors[descriptorIndex]
                        .descriptorRating.rate,
                    label:
                      propertiesRatings[propertyIndex]
                        .qualitativePrimesDescriptors[descriptorIndex]
                        .descriptorRating.rate,
                  }
                : null
            }
            onChange={(value) => {
              if (descriptorIndex === -1) {
                addPropertyRatingHandler(
                  property.id,
                  descriptor.id,
                  value.value,
                );
              }
            }}
          />
        );
      });
    });

    return matrix;
  };

  return (
    <div>
      <Table
        intersect="Nomenclatura"
        headers={makeHeaders()}
        columns={makeColumns()}
        data={makeCells()}
      />
    </div>
  );
};

DescriptorsPropertyRatings.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      m2Prime: PropTypes.number,
      unitPrime: PropTypes.number,
    }),
  ),
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.number,
      floor: PropTypes.number,
    }),
  ).isRequired,
  descriptors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      percentage: PropTypes.number,
    }),
  ).isRequired,
  addDescriptorHandler: PropTypes.func.isRequired,
  descriptorUpdateHandler: PropTypes.func.isRequired,
  removeDescriptorHandler: PropTypes.func.isRequired,
};

export default DescriptorsPropertyRatings;
