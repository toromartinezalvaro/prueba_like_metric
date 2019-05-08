import PrimeServiceDefinitions from './PrimeServiceDefinitions';
import Services from '../services'


export default class AreaServices extends Services  {


  getPrimes() {
    return this.get(PrimeServiceDefinitions.primes(""))
  }

  
  putPrimesById(primeId, data) {
  return this.put(PrimeServiceDefinitions.primes(primeId), data)
  }
}