import { API_PATH } from '../../config/config'

const PrimeServiceDefinitions = {
  primes: primeId => {return `${API_PATH}primes/altitude/${primeId}`},
  location: primeId => `${API_PATH}primes/location/${primeId}`
};

export default PrimeServiceDefinitions