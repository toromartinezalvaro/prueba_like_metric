/*
 * Created Date: Tuesday March 31st 2020
 * Author: Caraham
 * -----
 * Last Modified: Tuesday, 21st April 2020 1:46:47 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  getIncrementsAndStrategy: (towerId) => {
    return `${API_PATH}increments/${towerId}`;
  },
  getSuggestedIncrement: (groupId, ear, frequency) => {
    return `${API_PATH}increments/groups/${groupId}/ear/${ear}/frequencies/${frequency}`;
  },
  putStrategy: `${API_PATH}increments`,
  resetStrategy: (groupId) => {
    return `${API_PATH}increments/reset-strategy/${groupId}`;
  },
};

export default IncrementsServiceDefinition;
