import AreaServiceDefinitions from './AreaServicesDefinitions';
import Services from '../services';

export default class AreaServices extends Services {
  getAreas(towerId) {
    return this.get(AreaServiceDefinitions.areas(towerId));
  }

  deleteArea(areaTypeId) {
    return this.delete(AreaServiceDefinitions.areaByTypeId(areaTypeId));
  }

  putArea(areaTypeId, data) {
    return this.put(AreaServiceDefinitions.areaByTypeId(areaTypeId), data);
  }

  postArea(data) {
    return this.post(AreaServiceDefinitions.areaByTypeId(''), data);
  }

  putAreasByTowerId(towerId, data) {
    return this.put(AreaServiceDefinitions.areas(towerId), data);
  }

  putAreaPrice(areaId, data) {
    return this.put(AreaServiceDefinitions.areaPricesById(areaId), data);
  }

  putAreaTypePrice(areaTypeId, data) {
    return this.put(AreaServiceDefinitions.areasTypePrice(areaTypeId), data);
  }

  getPrices(towerId, areaTypeId) {
    return this.get(AreaServiceDefinitions.areasPrices(towerId, areaTypeId));
  }

  updateAreaType(id, data) {
    return this.put(AreaServiceDefinitions.updateAreaType(id), data);
  }

  isDisable(towerId) {
    return this.get(AreaServiceDefinitions.getSalesRequestHistory(towerId));
  }

  getInputMethod(towerId) {
    return this.get(AreaServiceDefinitions.getInputMethod(towerId));
  }

  putInputMethod(towerId, inputMethod) {
    return this.put(AreaServiceDefinitions.putInputMethod(towerId), {
      inputMethod,
    });
  }
}
