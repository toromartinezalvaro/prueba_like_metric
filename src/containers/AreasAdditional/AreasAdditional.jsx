/*
 * Created Date: Tuesday November 12th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 13th December 2019 4:18:23 am
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
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import EmptyContentMessageView from '../../components/UI/EmptyContentMessageView';

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

  addAreaHandler = (unit, quantity, name, isChecked, price) => {
    this.props.onLoading();
    this.services
      .postAreaType({
        unit,
        towerId: this.props.match.params.towerId,
        quantity,
        name,
        isChecked,
        price,
      })
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => {
        this.setState({ arrayAreaTypes: areas.data });
        this.props.offLoading();
      })
      .catch((error) => {
        this.props.offLoading();
        this.props.spawnMessage('No se pudo crear el tipo de area', 'error');
        console.error(error);
      });
  };

  updateAreaTypeHandler = (unit, name, id) => {
    this.props.onLoading();
    this.services
      .putAreaType({
        unit,
        name,
        id,
      })
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => {
        this.setState({ arrayAreaTypes: areas.data });
        this.props.offLoading();
      })
      .catch((error) => {
        this.props.offLoading();
        this.props.spawnMessage('No se pudo editar el tipo de area', 'error');
        console.error(error);
      });
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
    this.props.onLoading();

    this.services
      .deleteArea(id)
      .then(() => this.services.getAreas(this.props.match.params.towerId))
      .then((areas) => {
        this.props.offLoading();
        this.setState({ arrayAreaTypes: areas.data });
      })
      .catch((error) => {
        this.props.offLoading();
        this.props.spawnMessage('No se pudo eliminar el tipo de area', 'error');
        console.error(error);
      });
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
            {this.state.arrayAreaTypes.length === 0 && (
              <EmptyContentMessageView
                title="Vamos a crear areas adicionales 📏!"
                message="Es fácil, debes hacer click en el botón inferior y llenar el formulario"
              />
            )}
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

export default withDefaultLayout(AreasAdditional);
