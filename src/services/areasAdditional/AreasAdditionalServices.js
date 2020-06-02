/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 20th November 2019 1:50:25 am
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
    return this.put(AreasAdditionalServicesDefinition.putAreaType(), data);
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

  isDisable(towerId) {
    return this.get(
      AreasAdditionalServicesDefinition.getSalesRequestHistory(towerId),
    );
  }
}
