/*
 * Created Date: Tuesday November 12th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 3:35:06 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import AreasAdditionalServices from '../../services/areasAdditional/AreasAdditionalServices';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Collapsables from '../../components/AreasAdditional/Collapsables';
import AddArea from '../../components/AreasAdditional/AddArea/AddArea';

class AreasAdditional extends Component {
  constructor(props) {
    super(props);
    this.services = new AreasAdditionalServices(this);
  }

  state = {
    arrayAreaTypes: [],
  };

  addAreaHandler = (unit, quantity, name) => {
    this.services
      .postAreaType({
        unit,
        towerId: this.props.match.params.towerId,
        quantity,
        name,
      })
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => this.setState({ arrayAreaTypes: areas.data }))
      .catch((error) => console.error(error));
  };

  addAreaAdditionalHandler = (nomenclature, measure, price) => {
    this.services
      .postAreaAdditional({
        nomenclature,
        towerId: this.props.match.params.towerId,
        measure,
        price,
      })
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => this.setState({ arrayAreaTypes: areas.data }))
      .catch((error) => console.error(error));
  };

  deleteArea = (id) => {
    this.services
      .deleteArea(id)
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => this.setState({ arrayAreaTypes: areas.data }))
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    this.services
      .getAreas(this.props.match.params.towerId)
      .then((areas) => this.setState({ arrayAreaTypes: areas.data }))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      /*       <LoadableContainer isLoading={this.state.isLoading}>
       */ <Card>
        <CardHeader>
          <span>Areas Adicionales</span>
        </CardHeader>
        <CardBody>
          <Collapsables
            data={this.state.arrayAreaTypes}
            deleteArea={this.deleteArea}
            addAreaAdditionalHandler={this.addAreaAdditionalHandler}
          ></Collapsables>
          <AddArea addAreaHandler={this.addAreaHandler}></AddArea>
        </CardBody>
      </Card>
      /*       </LoadableContainer>
       */
    );
  }
}

export default AreasAdditional;
