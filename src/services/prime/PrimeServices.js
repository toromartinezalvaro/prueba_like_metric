import PrimeServiceDefinitions from "./PrimeServiceDefinitions";
import Services from "../services";

export default class PrimeServices extends Services {
  getAltitudePrimes(towerId) {
    return this.get(PrimeServiceDefinitions.altitudeByTower(towerId));
  }

  getLocationPrimes(towerId) {
    return this.get(PrimeServiceDefinitions.locationByTower(towerId));
  }

  putAltitudePrimesById(primeId, data) {
    return this.put(PrimeServiceDefinitions.altitude(primeId), data);
  }

  putLocationPrimesById(primeId, data) {
    return this.put(PrimeServiceDefinitions.location(primeId), data);
  }

  putAltitudePrimeUnit(unit) {
    return this.put(PrimeServiceDefinitions.altitude("units"), unit);
  }

  putLocationPrimeUnit(unit) {
    return this.put(PrimeServiceDefinitions.location("units"), unit);
  }
}
