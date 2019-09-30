import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ratings from './ratings';
import DefinitionsPropertyRatings from './DefinitionsPropertyRatings';
import Primes from './Primes';
import 'react-tabs/style/react-tabs.css';

const QualitativePrimes = () => {
  const [data, setData] = useState({});

  useEffect(() => {});

  return (
    <Tabs>
      <TabList>
        <Tab>Escala de valores</Tab>
        <Tab>Definiciones y calificaciones</Tab>
        <Tab>Primas</Tab>
      </TabList>

      <TabPanel>
        <Ratings />
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
