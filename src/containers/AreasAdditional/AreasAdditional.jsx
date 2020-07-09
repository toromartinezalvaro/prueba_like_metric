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
import _ from 'lodash';
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
    disableSold: false,
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
      areaTypeFounded.additionalAreas[index][key] = value;
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
        const areasData = areas.data.map((area) => {
          const additionalAreas = _.orderBy(
            area.additionalAreas,
            [
              (additionalArea) =>
                Number(additionalArea.nomenclature)
                  ? Number(additionalArea.nomenclature)
                  : additionalArea.nomenclature,
            ],
            ['asc'],
          );
          return {
            ...area,
            additionalAreas,
          };
        });
        this.setState({ arrayAreaTypes: areasData });
        this.props.offLoading();
      })
      .catch((error) => {
        this.props.offLoading();
        this.props.spawnMessage('No se pudo editar el tipo de area', 'error');
        console.error(error);
      });
  };

  repeatedChecker = (indexArea, indexAreaType, nomenclature) => {
    const areaTypes = this.state.arrayAreaTypes[indexAreaType].additionalAreas;
    const repeatedArray = areaTypes.filter(
      (item) => item.nomenclature === nomenclature,
    );
    return !(repeatedArray.length > 1);
  };

  addAreaAdditionalHandler = (
    nomenclature,
    measure,
    price,
    areaTypeId,
    indexAreaType,
    indexArea,
  ) => {
    const checker = this.repeatedChecker(
      indexArea,
      indexAreaType,
      nomenclature,
    );
    if (checker) {
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
          areas[indexAreaType].additionalAreas[indexArea] = area.data;
          this.setState({ arrayAreaTypes: areas });
        })
        .catch((error) => {
          this.props.spawnMessage(
            'No se pudo eliminar el tipo de area. Este dato no se guardará',
            'error',
          );
          console.error(error);
        });
    } else {
      this.props.spawnMessage(
        'No puede poner una nomenclatura repetiva.',
        'error',
      );
    }
  };

  updateAreaAdditionalHandler = (nomenclature, measure, price, areaId) => {
    this.services
      .putAreaAdditional({
        nomenclature,
        measure,
        price: `${price}`,
        areaId,
      })
      .catch((error) => {
        this.props.spawnMessage('No se pudo eliminar el tipo de area', 'error');
        console.error(error);
      });
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
      .isDisable(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ disableSold: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.services
      .getAreas(this.props.match.params.towerId)
      .then((areas) => {
        const sortedAreas = areas.data.map((areaType) => {
          const tempAreaType = { ...areaType };
          tempAreaType.additionalAreas.sort((a, b) =>
            a.nomenclature.localeCompare(b.nomenclature, undefined, {
              numeric: true,
              sensitivity: 'base',
            }),
          );
          return tempAreaType;
        });
        this.setState({
          arrayAreaTypes: sortedAreas,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.props.spawnMessage('No se pudo eliminar el tipo de area', 'error');
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
                disableSold={this.state.disableSold}
              />
            )}
            <Collapsables
              data={this.state.arrayAreaTypes}
              deleteArea={this.deleteArea}
              arrayAreaTypesHandler={this.arrayAreaTypesHandler}
              addAreaAdditionalHandler={this.addAreaAdditionalHandler}
              updateAreaAdditionalHandler={this.updateAreaAdditionalHandler}
              updateAreaTypeHandler={this.updateAreaTypeHandler}
              disableSold={this.state.disableSold}
            ></Collapsables>
            <AddArea addAreaHandler={this.addAreaHandler}></AddArea>
          </CardBody>
        </Card>
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(AreasAdditional);
