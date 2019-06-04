import { API_PATH } from '../../config/config'

const PrimeServiceDefinitions = {
  altitudeByTower: towerId => `${API_PATH}primes/altitudes/${towerId}`,
  locationByTower: towerId => `${API_PATH}primes/locations/${towerId}`,
  altitude: primeId => {return `${API_PATH}primes/altitudes/${primeId}`},
  location: primeId => `${API_PATH}primes/locations/${primeId}`
};

export default PrimeServiceDefinitions