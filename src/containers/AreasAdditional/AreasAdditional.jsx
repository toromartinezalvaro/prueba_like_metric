/*
 * Created Date: Tuesday November 12th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 6th December 2019 6:44:31 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import AreasAdditionalServices from '../../services/areasAdditional/AreasAdditionalServices';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Collapsables from '../../components/AreasAdditional/Collapsables';
import AddArea from '../../components/AreasAdditional/AddArea/AddArea';
import LoadableContainer from '../../components/UI/Loader';

class AreasAdditional extends Component {
  constructor(props) {
    super(props);
    this.services = new AreasAdditionalServices(this);
  }

  state = {
    arrayAreaTypes: [],
    isLoading: false,
  };

  arrayAreaTypesHandler = (
    areaTypeId,
    index,
    key,
    value,
    isAreaType = false,
  ) => {
    const array = [...this.state.arrayAreaTypes];
    const areaTypeFounded = array.find(
      (areaType) => areaTypeId === areaType.id,
    );
    if (isAreaType) {
      areaTypeFounded[key] = value;
    } else {
      areaTypeFounded.formatedAreas[index][key] = value;
    }
    this.setState({ arrayAreaTypes: array });
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

  updateAreaTypeHandler = (unit, name, id) => {
    this.services
      .putAreaType({
        unit,
        name,
        id,
      })
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => this.setState({ arrayAreaTypes: areas.data }))
      .catch((error) => console.error(error));
  };

  addAreaAdditionalHandler = (
    nomenclature,
    measure,
    price,
    areaTypeId,
    indexAreaType,
    indexArea,
  ) => {
    this.services
      .postAreaAdditional({
        nomenclature,
        areaTypeId,
        towerId: this.props.match.params.towerId,
        measure,
        price: `${price}`,
      })
      .then((area) => {
        const areas = this.state.arrayAreaTypes;
        areas[indexAreaType].formatedAreas[indexArea] = area.data;
        this.setState({ arrayAreaTypes: areas });
      })
      .catch((error) => console.error(error));
  };

  updateAreaAdditionalHandler = (nomenclature, measure, price, areaId) => {
    this.services
      .putAreaAdditional({
        nomenclature,
        measure,
        price: `${price}`,
        areaId,
      })
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
    this.setState({ isLoading: true });
    this.services
      .getAreas(this.props.match.params.towerId)
      .then((areas) =>
        this.setState({ arrayAreaTypes: areas.data, isLoading: false }),
      )
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <Card>
          <CardHeader>
            <span>Areas Adicionales</span>
          </CardHeader>
          <CardBody>
            <Collapsables
              data={this.state.arrayAreaTypes}
              deleteArea={this.deleteArea}
              arrayAreaTypesHandler={this.arrayAreaTypesHandler}
              addAreaAdditionalHandler={this.addAreaAdditionalHandler}
              updateAreaAdditionalHandler={this.updateAreaAdditionalHandler}
              updateAreaTypeHandler={this.updateAreaTypeHandler}
            ></Collapsables>

            <AddArea addAreaHandler={this.addAreaHandler}></AddArea>
          </CardBody>
        </Card>
      </LoadableContainer>
    );
  }
}

export default AreasAdditional;
