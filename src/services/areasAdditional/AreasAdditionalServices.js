/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Monday, 18th November 2019 5:25:05 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import Services from '../services';
import AreasAdditionalServicesDefinition from './AreasAdditionalServicesDefinitions';

export default class AreasAdditionalServices extends Services {
  getAreas(towerId) {
    return this.get(AreasAdditionalServicesDefinition.areas(towerId));
  }

  deleteArea(areaTypeId) {
    return this.delete(
      AreasAdditionalServicesDefinition.areaByTypeId(areaTypeId),
    );
  }

  postAreaType(data) {
    return this.post(AreasAdditionalServicesDefinition.areaType(), data);
  }

  putAreaType(data) {
    return this.put(AreasAdditionalServicesDefinition.areaType(), data);
  }

  postAreaAdditional(data) {
    return this.post(
      AreasAdditionalServicesDefinition.postAreaAdditional(),
      data,
    );
  }

  putAreaAdditional(data) {
    return this.put(
      AreasAdditionalServicesDefinition.putAreaAdditional(),
      data,
    );
  }
}
