/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 20th November 2019 1:50:12 am
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

  putAreaType: () => {
    return `${API_PATH}areasV2/area-types/additional/update`;
  },

  postAreaAdditional: () => {
    return `${API_PATH}areasV2/additional`;
  },

  putAreaAdditional: () => {
    return `${API_PATH}areasV2/areas/additional`;
  },
  getSalesRequestHistory: (towerId) => {
    return `${API_PATH}sale-requests/sales-request-history/${towerId}`;
  },
};

export default AreaAdditionalServiceDefinitions;
