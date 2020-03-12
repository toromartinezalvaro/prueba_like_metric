import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ratings from './Ratings';
import DescriptorsPropertyRatings from './DescriptorsPropertyRatings';
import Primes from './Primes';
import Services from '../../../services/prime/QualitativePrimes';
import 'react-tabs/style/react-tabs.css';

const QualitativePrimes = ({
  towerId,
  headers,
  floorsNames,
  changeModalState,
  reloadPrimes,
  alertHandler,
  lowestFloor,
  disabledProp,
}) => {
  const services = new Services();

  const descriptors2 = useRef(null);

  const [ratings, setRatings] = useState([]);
  const [descriptors, setDescriptors] = useState([]);
  const [properties, setProperties] = useState([]);
  const [propertiesRatings, setPropertiesRatings] = useState([]);

  useEffect(() => {
    services
      .getRatings(towerId)
      .then((response) => {
        const orderedRatings = _.sortBy(response.data, (e) => e.id);
        setRatings(orderedRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });

    services
      .getDescriptors(towerId)
      .then((response) => {
        const orderedDescriptors = _.sortBy(response.data, (e) => e.id);
        setDescriptors(orderedDescriptors);
        descriptors2.current = orderedDescriptors;
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });

    services
      .getPropertiesRatings(towerId)
      .then((response) => {
        const orderedProperties = _.sortBy(
          response.data.properties,
          ['floor', 'location'],
          ['asc', 'asc'],
        );
        setProperties(orderedProperties);
        setPropertiesRatings(response.data.propertiesRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });

    return () => {};
  }, []);

  const handleAddRating = () => {
    services
      .postRating(towerId, {
        m2Prime: 0,
        unitPrime: 0,
      })
      .then((response) => {
        const tempRatings = [...ratings];
        tempRatings.push(response.data);
        setRatings(tempRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleRatingUpdate = (id, ratingRata) => {
    services
      .putRating(id, ratingRata)
      .then((response) => {
        const tempRatings = [...ratings];
        const ratingIndex = _.findIndex(ratings, (e) => e.id === id);
        if (ratingIndex !== -1) {
          tempRatings[ratingIndex] = response.data;
          setRatings(tempRatings);
        }
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleRemoveRating = () => {
    services
      .deleteRating(towerId)
      .then(() => {
        const tempRatings = ratings.slice(0, ratings.length - 1);
        setRatings(tempRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleAddDescriptor = () => {
    services
      .postDescriptor(towerId, { name: 'Descriptor nuevo', percentage: 0 })
      .then((response) => {
        const tempDescriptors = [...descriptors];
        tempDescriptors.push(response.data);
        setDescriptors(tempDescriptors);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleDescriptorUpdate = (id, descriptorData) => {
    services
      .putDescriptor(id, descriptorData)
      .then((response) => {
        const descriptorIndex = _.findIndex(descriptors, (e) => e.id === id);
        if (descriptorIndex !== -1) {
          const tempDescriptors = [...descriptors];
          tempDescriptors[descriptorIndex] = response.data;
          setDescriptors(tempDescriptors);
        }
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleRemoveDescriptor = (id) => {
    services
      .deleteDescriptor(id)
      .then(() => {
        const tempDescriptors = descriptors.filter((descriptor) => {
          return descriptor.id !== id;
        });
        const tempPropertiesRatings = propertiesRatings.map((property) => {
          const tempProperty = { ...property };
          const filteredDescriptors = property.qualitativePrimesDescriptors.filter(
            (descriptor) => {
              return descriptor.id !== id;
            },
          );
          tempProperty.qualitativePrimesDescriptors = filteredDescriptors;
          return tempProperty;
        });
        setDescriptors(tempDescriptors);
        setPropertiesRatings(tempPropertiesRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleAddPropertyRating = (propertyId, descriptorId, rating) => {
    services
      .postPropertyRating(propertyId, descriptorId, { rating })
      .then((response) => {
        const propertyIndex = _.findIndex(
          propertiesRatings,
          (o) => o.id === propertyId,
        );
        const tempPropertiesRatings = [...propertiesRatings];
        tempPropertiesRatings[propertyIndex].qualitativePrimesDescriptors.push(
          response.data,
        );
        setPropertiesRatings(tempPropertiesRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handlePropertyRatingUpdate = (
    propertyRatingId,
    propertyId,
    descriptorId,
    rating,
  ) => {
    services
      .putPropertyRating(propertyRatingId, { rating })
      .then((response) => {
        const propertyIndex = _.findIndex(
          propertiesRatings,
          (o) => o.id === propertyId,
        );
        const descriptorIndex = _.findIndex(
          propertiesRatings[propertyIndex].qualitativePrimesDescriptors,
          (o) => o.id === descriptorId,
        );
        const tempPropertiesRatings = [...propertiesRatings];
        tempPropertiesRatings[propertyIndex].qualitativePrimesDescriptors[
          descriptorIndex
        ] = response.data;
        setPropertiesRatings(tempPropertiesRatings);
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  const handleUpdatePrimes = (primeType) => {
    services
      .postPrimes(primeType, towerId)
      .then(() => {
        reloadPrimes();
        changeModalState();
        alertHandler('Las primas se actualizaron correctamente', 'success');
      })
      .catch((error) => {
        alertHandler(error.response.data.message, 'error');
      });
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Escala de valores</Tab>
        <Tab>Definiciones y calificaciones</Tab>
        <Tab>Primas</Tab>
      </TabList>

      <TabPanel>
        <Ratings
          ratings={ratings}
          disabledProp={disabledProp}
          addRatingHandler={handleAddRating}
          removeRatingHandler={handleRemoveRating}
          updateRatingHandler={handleRatingUpdate}
        />
      </TabPanel>
      <TabPanel>
        <DescriptorsPropertyRatings
          ratings={ratings}
          properties={properties}
          descriptors={descriptors}
          propertiesRatings={propertiesRatings}
          addDescriptorHandler={handleAddDescriptor}
          descriptorUpdateHandler={handleDescriptorUpdate}
          removeDescriptorHandler={handleRemoveDescriptor}
          addPropertyRatingHandler={handleAddPropertyRating}
          propertyRatingUpdateHandler={handlePropertyRatingUpdate}
          disabledProp={disabledProp}
        />
      </TabPanel>
      <TabPanel>
        <Primes
          headers={headers}
          floorsNames={floorsNames}
          ratings={ratings}
          descriptors={descriptors}
          propertiesRatings={propertiesRatings}
          handleUpdatePrimes={handleUpdatePrimes}
          lowestFloor={lowestFloor}
        />
      </TabPanel>
    </Tabs>
  );
};

QualitativePrimes.propTypes = {
  towerId: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.number).isRequired,
  floorsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeModalState: PropTypes.func.isRequired,
  reloadPrimes: PropTypes.func.isRequired,
  alertHandler: PropTypes.func.isRequired,
  lowestFloor: PropTypes.number.isRequired,
};

export default QualitativePrimes;
