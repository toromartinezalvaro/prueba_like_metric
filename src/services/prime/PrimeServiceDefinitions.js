import { API_PATH } from '../../config/config'

const PrimeServiceDefinitions = {
  altitude: primeId => {return `${API_PATH}primes/altitudes/${primeId}`},
  location: primeId => `${API_PATH}primes/locations/${primeId}`
};

export default PrimeServiceDefinitions