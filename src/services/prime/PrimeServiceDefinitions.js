import { API_PATH } from '../../config/config'

const PrimeServiceDefinitions = {
  primes: primeId => {return `${API_PATH}primes/${primeId}`}
};

export default PrimeServiceDefinitions