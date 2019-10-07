import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  RadioButton,
  ReversedRadioButton,
} from 'react-radio-buttons';
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

  const createMatrix = (m, n, content) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill(content));
  };

  const calculateFinalRating = (ratings) => {
    return ratings.reduce((current, next) => {
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
      <Table
        intersect="Nomenclatura"
        headers={headers}
        columns={floorsNames}
        data={makeCells()}
      />
    </div>
  );
};

Primes.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.number).isRequired,
  floorsNames: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Primes;
