import AreaServiceDefinitions from './AreaServicesDefinitions';
import Services from '../services'


export default class AreaServices extends Services  {


  getAreas() {
    return this.get(AreaServiceDefinitions.areas(""))
  }

  deleteArea(areaTypeId) {
    return this.delete(AreaServiceDefinitions.areaByTypeId(areaTypeId))
  }
  
  putArea(areaTypeId, data) {
  return this.put(AreaServiceDefinitions.areaByTypeId(areaTypeId), data)
  }

  postArea(data) {
    return this.post(AreaServiceDefinitions.areaByTypeId(""), data)
  }

  putAreasByTowerId(towerId, data) {
    return this.put(AreaServiceDefinitions.areas(towerId), data)
  }

}