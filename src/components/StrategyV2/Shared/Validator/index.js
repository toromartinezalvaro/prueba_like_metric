/*
 * Created Date: Thursday July 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 30th July 2020 2:32:53 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

const validateSelectedGroup = (strategy) =>
  !strategy.groups[strategy.selectedGroup];

export default validateSelectedGroup;
