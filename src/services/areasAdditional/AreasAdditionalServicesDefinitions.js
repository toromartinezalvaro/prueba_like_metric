/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Monday, 18th November 2019 5:24:59 pm
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

  areaType: () => {
    return `${API_PATH}areasV2/area-types/additional`;
  },

  postAreaAdditional: () => {
    return `${API_PATH}areasV2/additional`;
  },

  putAreaAdditional: () => {
    return `${API_PATH}areasV2/areas/additional`;
  },
};

export default AreaAdditionalServiceDefinitions;
