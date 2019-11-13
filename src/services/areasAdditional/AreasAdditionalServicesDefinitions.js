/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 4:44:15 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import { API_PATH } from '../../config/config';

const AreaAdditionalServiceDefinitions = {
  areas: (towerId) => {
    return `${API_PATH}areasV2/areas-additional/${towerId}`;
  },

  areaByTypeId: (areaTypeId) => {
    return `${API_PATH}areasV2/area-types/${areaTypeId}`;
  },

  postAreaType: () => {
    return `${API_PATH}areasV2/area-types/additional`;
  },

  postAreaAdditional: () => {
    return `${API_PATH}areasV2/additional`;
  },
};

export default AreaAdditionalServiceDefinitions;
