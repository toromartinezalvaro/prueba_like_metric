import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import _ from 'lodash';
import Table from '../../../UI/Table/Table';

const MT2 = 'm2Prime';
const UNIT = 'unitPrime';

const Primes = ({
  headers,
  floorsNames,
  ratings,
  descriptors,
  propertiesRatings,
}) => {
  const [primeType, setPrimeType] = useState(MT2);

  const is100Percent = () => {
    return (
      descriptors.reduce((current, next) => {
        return current + next.percentage;
      }, 0) === 1
    );
  };

  const createMatrix = (m, n, content) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill(content));
  };

  const calculateFinalRating = (propertyRatings) => {
    return propertyRatings.reduce((current, next) => {
      return current + next.descriptorRating.rate * next.percentage;
    }, 0);
  };

  const makeCells = () => {
    const matrix = createMatrix(
      headers.length,
      floorsNames.length,
      <span>-</span>,
    );
    propertiesRatings.forEach((propertyRating) => {
      if (
        propertyRating.qualitativePrimesDescriptors.length ===
        descriptors.length
      ) {
        const finalRating = calculateFinalRating(
          propertyRating.qualitativePrimesDescriptors,
        );
        const prime = _.find(ratings, (e) => e.rate === finalRating);
        matrix[propertyRating.floor - 1][propertyRating.location - 1] = (
          <span>${prime[primeType]}</span>
        );
      }
    });
    return matrix;
  };

  return (
    <div>
      <div>
        <div>
          <span>Primas</span>
        </div>
        <div>
          <RadioGroup
            value={primeType}
            onChange={(value) => {
              setPrimeType(value);
            }}
            horizontal
          >
            <RadioButton value={MT2}>m²</RadioButton>
            <RadioButton value={UNIT}>Unidad</RadioButton>
          </RadioGroup>
        </div>
      </div>
      {is100Percent() ? (
        <Table
          intersect="Nomenclatura"
          headers={headers}
          columns={floorsNames}
          data={makeCells()}
        />
      ) : (
        <span>No es 100</span>
      )}
    </div>
  );
};

Primes.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.number).isRequired,
  floorsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      m2Prime: PropTypes.number,
      unitPrime: PropTypes.number,
    }),
  ),
  descriptors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      percentage: PropTypes.number,
    }),
  ).isRequired,
};

export default Primes;
