/*
 * Created Date: Tuesday March 31st 2020
 * Author: Caraham
 * -----
 * Last Modified: Tuesday, 21st April 2020 2:16:17 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import IncrementsServiceDefinition from './incrementsServiceDefinition';
import Services from '../services';

export default class IncrementsServices extends Services {
  getIncrementsAndStrategy(towerId) {
    return this.get(
      IncrementsServiceDefinition.getIncrementsAndStrategy(towerId),
    );
  }

  getSuggestedIncrement(groupId, ear, frequency) {
    return this.get(
      IncrementsServiceDefinition.getSuggestedIncrement(
        groupId,
        ear,
        frequency,
      ),
    );
  }

  putStrategy(data) {
    return this.put(IncrementsServiceDefinition.putStrategy, data);
  }

  resetStrategy(groupId) {
    return this.put(IncrementsServiceDefinition.resetStrategy(groupId));
  }
}
