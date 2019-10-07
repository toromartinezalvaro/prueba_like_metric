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
  propertyRatingUpdateHandler,
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

  const getOptions = () => {
    return ratings.map((rating) => ({
      value: rating.rate,
      label: rating.rate,
    }));
  };

  const getValue = (descriptorIndex, propertyIndex) => {
    const value =
      propertyIndex !== -1 && descriptorIndex !== -1
        ? propertiesRatings[propertyIndex].qualitativePrimesDescriptors[
            descriptorIndex
          ].descriptorRating.rate
        : null;
    return {
      value,
      label: value,
    };
  };

  const makeCells = () => {
    const matrix = properties.map((property, i) => {
      const propertyIndex = _.findIndex(
        propertiesRatings,
        (o) => o.id === property.id,
      );
      if (propertyIndex !== -1) {
        return descriptors.map((descriptor, j) => {
          const descriptorIndex = _.findIndex(
            propertiesRatings[propertyIndex].qualitativePrimesDescriptors,
            (o) => o.id === descriptor.id,
          );
          return (
            <Select
              key={`rating-${i}-${j}`}
              options={getOptions()}
              value={getValue(descriptorIndex, propertyIndex)}
              onChange={(value) => {
                if (descriptorIndex === -1) {
                  addPropertyRatingHandler(
                    property.id,
                    descriptor.id,
                    value.value,
                  );
                } else {
                  propertyRatingUpdateHandler(
                    propertiesRatings[propertyIndex]
                      .qualitativePrimesDescriptors[descriptorIndex]
                      .descriptorRating.id,
                    property.id,
                    descriptor.id,
                    value.value,
                  );
                }
              }}
            />
          );
        });
      }
      return [[]];
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
  propertiesRatings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.name,
      name: PropTypes.string,
      location: PropTypes.number,
      floor: PropTypes.number,
      qualitativePrimesDescriptors: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          percentage: PropTypes.number,
          descriptorRating: PropTypes.shape({
            id: PropTypes.number,
            rate: PropTypes.number,
          }),
        }),
      ),
    }),
  ).isRequired,
  addDescriptorHandler: PropTypes.func.isRequired,
  descriptorUpdateHandler: PropTypes.func.isRequired,
  removeDescriptorHandler: PropTypes.func.isRequired,
  addPropertyRatingHandler: PropTypes.func.isRequired,
  propertyRatingUpdateHandler: PropTypes.func.isRequired,
};

export default DescriptorsPropertyRatings;
