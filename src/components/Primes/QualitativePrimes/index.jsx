import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ratings from './Ratings';
import DescriptorsPropertyRatings from './DescriptorsPropertyRatings';
import Primes from './Primes';
import Services from '../../../services/prime/QualitativePrimes';
import 'react-tabs/style/react-tabs.css';

const QualitativePrimes = ({ towerId }) => {
  const services = new Services();

  const descriptors2 = useRef(null);

  const [ratings, setRatings] = useState([]);
  const [descriptors, setDescriptors] = useState([]);

  useEffect(() => {
    services
      .getRatings(towerId)
      .then((response) => {
        const orderedRatings = _.sortBy(response.data, (e) => e.id);
        setRatings(orderedRatings);
      })
      .catch((error) => {
        console.error(error);
      });

    services
      .getDescriptors(towerId)
      .then((response) => {
        const orderedDescriptors = _.sortBy(response.data, (e) => e.id);
        setDescriptors(orderedDescriptors);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log('CONSOLE.LOG DESDE EFFECT', descriptors2);
  }, [descriptors2]);

  const handleAddRating = () => {
    services
      .postRate(towerId, {
        m2Prime: 0,
        unitPrime: 0,
      })
      .then((response) => {
        const tempRatings = [...ratings];
        tempRatings.push(response.data);
        setRatings(tempRatings);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveRating = (id) => {
    services
      .deleteRate(towerId)
      .then(() => {
        const tempRatings = ratings.slice(0, ratings.length - 1);
        setRatings(tempRatings);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRatingUpdate = (id, rateData) => {
    services
      .putRate(id, rateData)
      .then((response) => {
        const tempRatings = [...ratings];
        const ratingIndex = _.findIndex(ratings, (e) => e.id === id);
        if (ratingIndex !== -1) {
          tempRatings[ratingIndex] = response.data;
          setRatings(tempRatings);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddDescriptor = (descriptorData) => {
    services
      .postDescriptor(towerId, { name: 'New descriptor', percentage: 0 })
      .then((response) => {
        const tempDescriptors = [...descriptors];
        tempDescriptors.push(response.data);
        setDescriptors(tempDescriptors);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDescriptorUpdate = (id, descriptorData) => {
    services
      .putDescriptor(id, descriptorData)
      .then((response) => {
        const descriptorIndex = _.findIndex(descriptors, (e) => e.id === id);
        if (descriptorIndex !== -1) {
          const tempDescriptors = [...descriptors];
          descriptors2.current = response.data;
          tempDescriptors[descriptorIndex] = response.data;
          setDescriptors(tempDescriptors);
          console.log('......', response.data, descriptors, tempDescriptors);
        }
      })
      .catch((error) => {
        console.error(error);
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
          addRatingHandler={handleAddRating}
          removeRatingHandler={handleRemoveRating}
          updateRatingHandler={handleRatingUpdate}
        />
      </TabPanel>
      <TabPanel>
        <DescriptorsPropertyRatings
          descriptors={descriptors}
          addDescriptorHandler={handleAddDescriptor}
          descriptorUpdateHandler={handleDescriptorUpdate}
        />
      </TabPanel>
      <TabPanel>
        <Primes />
      </TabPanel>
    </Tabs>
  );
};

QualitativePrimes.propTypes = {
  towerId: PropTypes.string.isRequired,
};

export default QualitativePrimes;
