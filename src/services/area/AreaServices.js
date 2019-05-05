import AreaServiceDefinitions from './AreaServiceDefinitions';
import Services from '../services'


export default class AreaServices extends Services  {


  getAreas() {
    return this.get(AreaServiceDefinitions.areas)
  }

  deleteArea(areaTypeId) {
    return this.delete(AreaServiceDefinitions.areaByTypeId(areaTypeId))
  }
  
  putArea(areaTypeId, data) {
  return this.put(AreaServiceDefinitions.areaByTypeId(areaTypeId), data)
  }

  postSchema(data) {
    console.log(SchemaServiceDefinitions.schema(""))
    return this.post(SchemaServiceDefinitions.schema(""), data)
  }


  putProperties(data) {
    return this.put(SchemaServiceDefinitions.properties, data)
  }

}