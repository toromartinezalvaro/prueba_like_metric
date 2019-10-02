import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ratings from './ratings';
import DefinitionsPropertyRatings from './DefinitionsPropertyRatings';
import Primes from './Primes';
import 'react-tabs/style/react-tabs.css';
import Services from '../../../services/prime/QualitativePrimes';

const QualitativePrimes = ({ towerId }) => {
  const services = new Services();

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    services
      .getRatings(towerId)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const handleDeleteRating = (id) => {
    services
      .deleteRate(towerId)
      .then((response) => {
        const tempRatings = ratings.slice(0, ratings.length - 1);
        setRatings(tempRatings);
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
          deleteRatingHandler={handleDeleteRating}
        />
      </TabPanel>
      <TabPanel>
        <DefinitionsPropertyRatings />
      </TabPanel>
      <TabPanel>
        <Primes />
      </TabPanel>
    </Tabs>
  );
};

export default QualitativePrimes;
