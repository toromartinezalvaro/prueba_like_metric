/*
 * Created Date: Tuesday March 31st 2020
 * Author: Caraham
 * -----
 * Last Modified: Tuesday, 31st March 2020 4:34:16 pm
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
}
