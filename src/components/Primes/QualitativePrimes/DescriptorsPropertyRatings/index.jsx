import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import Table from '../../../UI/Table/Table';
import Button from '../../../UI2/Button';
import Descriptor from './Descriptor';
import Styles from './DescriptorsPropertyRatings.module.scss';

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
          // TODO: Too deep!
          return (
            <div key={`rating-${i}-${j}`} className={Styles.SelectorCell}>
              <Select
                className={Styles.Selector}
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
            </div>
          );
        });
      }
      return [[]];
    });

    return matrix;
  };

  const calculateDescriptorsTotalPercentage = () => {
    return descriptors.reduce((current, next) => {
      return current + next.percentage;
    }, 0);
  };

  return (
    <Fragment>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <span className={Styles.title}>Definiciones</span>
        </div>
        <div className={Styles.section}>
          Porcentaje total de las deficinones:{' '}
          <span className={Styles.percentage}>
            {calculateDescriptorsTotalPercentage() * 100}%
          </span>{' '}
          {calculateDescriptorsTotalPercentage() < 1 ? (
            <i
              className={`${Styles.alert} fas fa-info-circle`}
              data-tip="Las deficiones deben sumar 100% para continuar"
            ></i>
          ) : null}
        </div>
        <div>
          <Table
            intersect="Nomenclatura"
            headers={makeHeaders()}
            columns={makeColumns()}
            data={makeCells()}
          />
        </div>
      </div>
      <ReactTooltip />
    </Fragment>
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
