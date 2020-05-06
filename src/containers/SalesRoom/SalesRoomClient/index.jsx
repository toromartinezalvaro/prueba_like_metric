import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import ReactDOMServer from 'react-dom/server';
import NumberFormat from 'react-number-format';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import _ from 'lodash';
import Button from '../../../components/UI/Button/Button';

import SalesRoomService from '../../../services/salesRoom/salesRoomService';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../../components/UI/Card/Card';
import Modal from '../../../components/UI/Modal/Modal';
import agent from '../../../config/config';
import { Role } from '../../../helpers';
import variables from '../../../assets/styles/variables.scss';
import Selectors from '../../../components/SalesRoom/Selectors';
import PropertiesTable from '../../../components/SalesRoom/PropertiesTable';
import Message from '../../../components/SalesRoom/Message';
import Status from '../../../helpers/status';
import LoadableContainer from '../../../components/UI/Loader';
import SalesRoomModal from '../../../components/SalesRoom/modal';
import SalesRoomEnum from '../SalesRoom.enum';
import Styles from './salesRoomClient.module.scss';
import withDefaultLayout from '../../../HOC/Layouts/Default/withDefaultLayout';

class SalesRoom extends Component {
  constructor(props) {
    super(props);
    this.services = new SalesRoomService(this);
    this.makeArrayOfProperties = this.makeArrayOfProperties.bind(this);
  }

  state = {
    response: {},
    properties: 1,
    floors: 1,
    lowestFloor: 1,
    data: [[]],
    isOpen: false,
    isLoading: false,
    rightButton: {},
    leftButton: {},
    id: 0,
    groupId: 0,
    priceSold: 0,
    discountApplied: 0,
    isEmpty: null,
    isLoadingModal: false,
    selectedProperty: { name: '' },
    clientName: null,
    deadlineDate: new Date(),
    additionalAreas: [],
    lastSelector: 'priceWithIncrements',
    isLastProperty: false,
  };

  propertyHandler = (key, value) => {
    const temp = { ...this.state.selectedProperty };
    temp[key] = value;
    this.setState({ selectedProperty: temp });
  };

  componentDidMount() {
    const { towerId, clientId } = this.props.match.params;
    this.setState({ isLoading: true });
    this.services
      .getProperties(towerId, clientId)
      .then((properties) => {
        const { data } = properties;
        this.makeArrayOfProperties(data.incrementList);

        this.setState({
          isLoading: false,
          clientName: data.client.name,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
    this.updateAdditionalAreas();
  }

  buttonsStyles = (status) => {
    let backgroundColor;
    let rightButton;
    let leftButton;
    if (status === Status.Available) {
      backgroundColor = variables.greenColor;
      rightButton = { label: 'Vendido', color: variables.mainColor };
      leftButton = { label: 'Opcionado', color: variables.yellowColor };
    } else if (status === Status.Optional) {
      backgroundColor = variables.yellowColor;
      rightButton = { label: 'Vendido', color: variables.mainColor };
      leftButton = { label: 'Disponible', color: variables.greenColor };
    } else {
      backgroundColor = variables.mainColor;
      rightButton = {
        label: 'Opcionado',
        color: variables.yellowColor,
      };
      leftButton = { label: 'Disponible', color: variables.greenColor };
    }
    return {
      backgroundColor,
      rightButton,
      leftButton,
    };
  };

  onClickSelector = (property, buttons) => {
    if (this.state.clientName) {
      const tempProperty = { ...property };
      tempProperty.addedAdditionalAreas = tempProperty.additionalAreas.filter(
        (additionalArea) => additionalArea.addedFromSalesRoom,
      );
      tempProperty.adminAdditionalAreas = tempProperty.additionalAreas.filter(
        (additionalArea) => !additionalArea.addedFromSalesRoom,
      );
      const group = this.state.response.properties.find(
        (g) => g[0].groupId === tempProperty.groupId,
      );
      const availableProperties = group.filter(
        (p) => p.status === Status.Available,
      );
      this.setState({
        id: property.id,
        groupId: property.groupId,
        isOpen: true,
        rightButton: buttons.rightButton,
        leftButton: buttons.leftButton,
        priceSold: property.priceWithIncrement,
        selectedProperty: tempProperty,
        discountApplied: property.discount,
        isLastProperty: availableProperties.length === 1,
      });
    }
  };

  makeCells = (
    buttons,
    property,
    active = `${
      agent.isAuthorized([Role.Admin, Role.Super])
        ? 'priceWithIncrements'
        : 'name'
    }`,
  ) => {
    const propertyPrice = ReactDOMServer.renderToStaticMarkup(
      <NumberFormat
        value={property.price}
        displayType={'text'}
        thousandSeparator
        prefix={'$'}
      />,
    );
    return (
      <div
        style={{
          backgroundColor: buttons.backgroundColor,
          padding: '0.01em',
          textAlign: 'center',
          position: 'relative',
        }}
        onClick={() => this.onClickSelector(property, buttons)}
      >
        {active === 'name' ? (
          <p
            style={{ fontWeight: 'bold', color: 'White' }}
            data-tip={JSON.stringify(propertyPrice).slice(1, -1)}
          >
            {active === 'mts2' && parseFloat(property.mts2).toFixed(2)}
            {active === 'priceWithIncrements' && (
              <NumberFormat
                value={parseFloat(property.priceWithIncrement).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'price' && (
              <NumberFormat
                value={parseFloat(property.price).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'groups' && property.groupName}
            {property.requestStatus === 'R' && (
              <span className={Styles.rejectBadge}>R</span>
            )}
            {property.requestStatus === 'D' && (
              <span className={Styles.rejectBadge}>D</span>
            )}
            {active === 'name' && property.name}
          </p>
        ) : (
          <p
            style={{ fontWeight: 'bold', color: 'White' }}
            data-tip={property.name}
          >
            {active === 'mts2' && parseFloat(property.mts2).toFixed(2)}
            {active === 'priceWithIncrements' && (
              <NumberFormat
                value={parseFloat(property.priceWithIncrement).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'price' && (
              <NumberFormat
                value={parseFloat(property.price).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'groups' && property.groupName}
            {property.requestStatus === 'R' && (
              <span className={Styles.rejectBadge}>R</span>
            )}
            {property.requestStatus === 'D' && (
              <span className={Styles.rejectBadge}>D</span>
            )}
            {active === 'name' && property.name}
          </p>
        )}
        <ReactTooltip data-html={true} html={true} />
      </div>
    );
  };

  makeArrayOfProperties(properties, active) {
    const data = properties;

    if (data.floors !== null) {
      const matrix = this.createNullMatrix(data.floors, data.totalProperties);

      data.properties.forEach((row, n) => {
        row.forEach((property, m) => {
          const buttons = this.buttonsStyles(property.status);
          matrix[property.floor - data.lowestFloor][
            property.location - 1
          ] = this.makeCells(buttons, property, active);
        });
      });

      this.setState({
        response: properties,
        properties: data.totalProperties,
        floors: data.floors,
        lowestFloor: data.lowestFloor,
        data: matrix,
        isEmpty: false,
        lastSelector: active,
      });
    } else {
      this.setState({ isEmpty: true });
    }
  }

  findGroup = (properties) =>
    properties.find((group) => group[0].groupId === this.state.groupId);

  calculateCollectedIncrement(status) {
    const groups = this.state.response.properties;
    let properties = groups[0];
    if (groups.length > 1) {
      properties = this.findGroup(groups);
    }
    return properties.reduce((current, next) => {
      const { price } = next;
      let increment = next.priceSold - price;
      if (
        next.groupId === this.state.groupId &&
        next.status === Status.Sold &&
        next.id !== this.state.id
      ) {
        current += increment;
      } else if (next.id === this.state.id) {
        increment =
          this.state.priceSold -
          price -
          this.state.selectedProperty.discount +
          this.state.discountApplied;
        current += increment;
      }
      return current;
    }, 0);
  }

  save = () => {
    const collectedIncrement = this.calculateCollectedIncrement(
      this.state.rightButton.label,
    );
    let isBadgeIncrement = false;
    if (
      Math.trunc(collectedIncrement) > this.state.selectedProperty.increment
    ) {
      isBadgeIncrement = true;
      this.props.activateBadgeIncrement(true);
    } else {
      this.props.activateBadgeIncrement(false);
    }
    this.setState({ isLoadingModal: true });
    this.services
      .putState(
        {
          id: this.state.selectedProperty.id,
          status: this.state.selectedProperty.status,
          priceSold:
            this.state.selectedProperty.status !==
            SalesRoomEnum.status.AVAILABLE
              ? this.state.selectedProperty.priceWithIncrement -
                this.state.selectedProperty.discount +
                this.state.discountApplied
              : null,
          discount:
            this.state.selectedProperty.status !==
            SalesRoomEnum.status.AVAILABLE
              ? this.state.selectedProperty.discount
              : null,
          tradeDiscount:
            this.state.selectedProperty.status !==
            SalesRoomEnum.status.AVAILABLE
              ? this.state.selectedProperty.tradeDiscount
              : null,
          collectedIncrement,
          groupId: this.state.groupId,
          isBadgeIncrement,
          deadlineDate: Number(moment(this.state.deadlineDate).format('x')),
          addedAdditionalAreas: this.state.selectedProperty
            .addedAdditionalAreas,
        },
        this.props.match.params.towerId,
        this.props.match.params.clientId,
      )
      .then((response) => {
        const { incrementList } = response.data;
        if (incrementList) {
          this.makeArrayOfProperties(incrementList, this.state.lastSelector);
        }
        this.setState({
          isOpen: false,
          isLoadingModal: false,
        });
        this.updateAdditionalAreas();
      })
      .catch((err) => {
        console.log(err);
        this.updateAdditionalAreas();
        this.setState({ isLoadingModal: false });
      });

    return true;
  };

  cancel = () => {
    this.setState({ isOpen: false });
    this.updateAdditionalAreas();
  };

  createNullMatrix = (m, n) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill());
  };

  isThereOneAvailableProperty = (selectedProperty, propertiesMatrix) => {
    const propertiesArray = propertiesMatrix.find(
      (propertiesByGroup) =>
        propertiesByGroup.length > 0 &&
        propertiesByGroup[0].groupId === selectedProperty.groupId,
    );

    if (propertiesArray) {
      return (
        propertiesArray.filter(
          (property) => property.status === Status.Available,
        ).length === 1
      );
    }
    return false;
  };

  deadlineDateHandler = (value) => {
    this.setState({
      deadlineDate: value,
    });
  };

  addAdditionalArea = (id) => {
    return this.services
      .getAdditionalArea(id, this.props.match.params.towerId)
      .then((response) => {
        const { measure, price } = response.data;
        this.setState((prevState) => {
          const tempProperty = { ...prevState.selectedProperty };
          response.data.unitPrice = measure * price;
          tempProperty.addedAdditionalAreas.push(response.data);
          const tempAdditionalAreas = prevState.additionalAreas.filter(
            (additionalArea) => additionalArea.id !== id,
          );
          return {
            selectedProperty: tempProperty,
            additionalAreas: _.sortBy(tempAdditionalAreas, [
              { areaType: 'name' },
              'id',
            ]),
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  deleteAdditionalArea = (area) => {
    this.setState((prevState) => {
      const tempProperty = { ...prevState.selectedProperty };
      tempProperty.priceWithIncrement -= area.price;
      const tempAdditionalAreas = [...prevState.additionalAreas, area];
      tempProperty.addedAdditionalAreas = tempProperty.addedAdditionalAreas.filter(
        (additionalArea) => additionalArea.id !== area.id,
      );
      return {
        selectedProperty: tempProperty,
        additionalAreas: _.sortBy(tempAdditionalAreas, [
          { areaType: 'name' },
          'id',
        ]),
      };
    });
  };

  updateAdditionalAreas = () => {
    this.services
      .getAdditionalAreas(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ additionalAreas: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const isStrategyNull = this.state.selectedProperty.isReset;

    let showModalSelectedProperty = !isStrategyNull;

    if (
      isStrategyNull &&
      this.state.selectedProperty &&
      this.state.selectedProperty.increment < 0 &&
      this.state.selectedProperty.strategy == null
    ) {
      const isThereOneProperty = this.isThereOneAvailableProperty(
        this.state.selectedProperty,
        this.state.response.properties,
      );
      showModalSelectedProperty = isThereOneProperty;
    }

    if (isStrategyNull && this.state.isLastProperty) {
      showModalSelectedProperty = true;
    }

    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.isEmpty && (
          <Message route={this.props.match.params.towerId} />
        )}
        {!this.state.isEmpty && (
          <Card>
            <CardHeader>
              <div className={Styles.TitleContainer}>
                <p>Propiedades</p>
                {this.state.clientName ? (
                  <p>Cliente: {this.state.clientName}</p>
                ) : (
                  <p>No se ha seleccionado ningun cliente</p>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <Selectors
                makeArrayOfProperties={this.makeArrayOfProperties}
                response={this.state.response}
                buttonsStyles={this.buttonsStyles}
                makeCells={this.makeCells}
                agent={
                  agent.isAuthorized([Role.Admin, Role.Super])
                    ? 'super'
                    : 'staff'
                }
              />
              <PropertiesTable
                properties={this.state.properties}
                floors={this.state.floors}
                lowestFloor={this.state.lowestFloor}
                data={this.state.data}
              />
            </CardBody>
            <CardFooter />
            <Dialog open={this.state.isOpen}>
              <DialogTitle>
                <div>
                  <span>
                    {`Nuevo Estado - ${this.state.selectedProperty.name}`}
                  </span>
                  {this.state.selectedProperty.requestStatus === 'R' && (
                    <span className={Styles.rejectedLabel}>RECHAZADO</span>
                  )}
                </div>
              </DialogTitle>
              <DialogContent>
                {isStrategyNull &&
                  !this.state.isLastProperty &&
                  'Debe escoger una estrategia para poder vender los apartamentos de este grupo 📈'}
                {showModalSelectedProperty &&
                  (this.state.isLoadingModal ? (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                      <Loader
                        type="ThreeDots"
                        color={variables.mainColor}
                        height="100"
                        width="100"
                      />
                    </div>
                  ) : this.state.selectedProperty.clientId ===
                      this.props.match.params.clientId ||
                    this.state.selectedProperty.clientId === null ? (
                    <SalesRoomModal
                      isDisabled={
                        this.state.selectedProperty.requestStatus === 'D'
                      }
                      isLast={this.state.isLastProperty}
                      property={this.state.selectedProperty}
                      onChange={this.propertyHandler}
                      deadlineDate={this.state.deadlineDate}
                      onChangeDeadlineDate={this.deadlineDateHandler}
                      clientId={this.props.match.params.clientId}
                      additionalAreas={this.state.additionalAreas}
                      addAdditionalAreaHandler={this.addAdditionalArea}
                      deleteAdditionalAreaHandler={this.deleteAdditionalArea}
                      towerId={this.props.match.params.towerId}
                      spawnMessage={this.props.spawnMessage}
                      clientId={this.props.match.params.clientId}
                    />
                  ) : (
                    'El apartamento seleccionado no le pertenece a este cliente'
                  ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.cancel} className={Styles.CancelButton}>
                  Cancelar
                </Button>
                {(this.state.selectedProperty.clientId ===
                  this.props.match.params.clientId ||
                  this.state.selectedProperty.clientId === null) && (
                  <Button
                    onClick={this.save}
                    className={Styles.ConfirmButton}
                    isDisabled={
                      this.state.selectedProperty.requestStatus === 'D'
                    }
                  >
                    Aceptar
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </Card>
        )}
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(SalesRoom);
