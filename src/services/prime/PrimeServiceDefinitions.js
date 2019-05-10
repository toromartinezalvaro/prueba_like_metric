import { API_PATH } from '../../config/config'

const PrimeServiceDefinitions = {
  primes: primeId => {return `${API_PATH}primes/altitude/${primeId}`}
};

export default PrimeServiceDefinitions