/*
 * Created Date: Tuesday November 12th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 12:10:14 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Collapsables from '../../components/AreasAdditional/Collapsables';

class AreasAdditional extends Component {
  render() {
    return (
      /*       <LoadableContainer isLoading={this.state.isLoading}>
       */ <Card>
        <CardHeader>
          <span>Areas Adicionales</span>
        </CardHeader>
        <CardBody>
          <Collapsables></Collapsables>
        </CardBody>
      </Card>
      /*       </LoadableContainer>
       */
    );
  }
}

export default AreasAdditional;
