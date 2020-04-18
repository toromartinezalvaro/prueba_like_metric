/*
 * Created Date: Tuesday March 31st 2020
 * Author: Caraham
 * -----
 * Last Modified: Tuesday, 31st March 2020 2:20:32 pm
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
};

export default IncrementsServiceDefinition;
