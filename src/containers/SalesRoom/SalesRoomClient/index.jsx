import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import Button from '../../../components/UI/Button/Button';

import SalesRoomService from '../../../services/salesRoom/salesRoomService';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../../components/UI/Card/Card';
import Modal from '../../../components/UI/Modal/Modal';
import variables from '../../../assets/styles/variables.scss';
import Selectors from '../../../components/SalesRoom/Selectors';
import PropertiesTable from '../../../components/SalesRoom/PropertiesTable';
import Message from '../../../components/SalesRoom/Message';
import Status from '../../../helpers/status';
import LoadableContainer from '../../../components/UI/Loader';
import SalesRoomModal from '../../../components/SalesRoom/modal';
import SalesRoomEnum from '../SalesRoom.enum';
import Styles from './salesRoomClient.module.scss';

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
      this.setState({
        id: property.id,
        groupId: property.groupId,
        isOpen: true,
        rightButton: buttons.rightButton,
        leftButton: buttons.leftButton,
        priceSold: property.priceWithIncrement,
        selectedProperty: property,
        discountApplied: property.discount,
      });
    }
  };

  makeCells = (buttons, property, active = 'priceWithIncrements') => (
    <div
      style={{
        backgroundColor: buttons.backgroundColor,
        padding: '0.01em',
        textAlign: 'center',
        position: 'relative',
      }}
      onClick={() => this.onClickSelector(property, buttons)}
    >
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
      </p>
      <ReactTooltip />
    </div>
  );

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
      let increment = next.priceSold - next.price;
      if (
        next.groupId === this.state.groupId &&
        next.status !== Status.Available &&
        next.id !== this.state.id
      ) {
        current += increment;
      } else if (
        next.id === this.state.id &&
        this.state.selectedProperty.status !== SalesRoomEnum.status.AVAILABLE
      ) {
        increment =
          this.state.priceSold -
          next.price -
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
        },
        this.props.match.params.towerId,
        this.props.match.params.clientId,
      )
      .then((response) => {
        const { incrementList } = response.data;
        if (incrementList) {
          this.makeArrayOfProperties(incrementList);
        }
        this.setState({
          isOpen: false,
          isLoadingModal: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoadingModal: false });
      });
    return true;
  };

  cancel = () => {
    this.setState({ isOpen: false });
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

    return (
      propertiesArray.filter((property) => property.status === Status.Available)
        .length === 1
    );
  };

  deadlineDateHandler = (value) => {
    this.setState({
      deadlineDate: value,
    });
  };

  render() {
    let isStrategyNull = false;
    if (this.state.selectedProperty)
      isStrategyNull =
        this.state.selectedProperty.increment !== 0 &&
        !this.state.selectedProperty.strategy;

    let showModalSelectedProperty = false;
    if (this.state.selectedProperty)
      showModalSelectedProperty =
        this.state.selectedProperty.strategy > 0 ||
        !this.state.selectedProperty.increment;

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
      isStrategyNull = !isThereOneProperty;
      showModalSelectedProperty = isThereOneProperty;
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
                      property={this.state.selectedProperty}
                      onChange={this.propertyHandler}
                      deadlineDate={this.state.deadlineDate}
                      onChangeDeadlineDate={this.deadlineDateHandler}
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
                  <Button onClick={this.save} className={Styles.ConfirmButton}>
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

export default SalesRoom;
