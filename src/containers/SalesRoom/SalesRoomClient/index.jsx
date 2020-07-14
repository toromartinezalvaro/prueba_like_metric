import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import ReactDOMServer from 'react-dom/server';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import _ from 'lodash';
import Button from '../../../components/UI/Button/Button';
import { DashboardRoutes } from '../../../routes/local/routes';

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
import AlertRedirect from '../AlertRedirect';
import Styles from './salesRoomClient.module.scss';
import withDefaultLayout from '../../../HOC/Layouts/Default/withDefaultLayout';
import { changeGroup } from '../../StrategyV2/actions';

class SalesRoom extends Component {
  constructor(props) {
    super(props);
    this.services = new SalesRoomService();
    this.makeArrayOfProperties = this.makeArrayOfProperties.bind(this);
    this.isModalShowingStatesContent = false;
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
    optionalDescription: '',
    isSavingErrorActive: false,
    openGrouping: false,
  };

  propertyHandler = (key, value) => {
    const temp = { ...this.state.selectedProperty };
    let additionalState = {};
    if (key === 'status') additionalState = { isSavingErrorActive: false };
    temp[key] = value;
    this.setState({ selectedProperty: temp, ...additionalState });
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

        const checker = this.state.data.flatMap((singleData) =>
          singleData.filter((datas) => datas !== null),
        );
        if (checker.length < 1) {
          this.setState({ openGrouping: true });
        }
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
      try {
        const tempProperty = { ...property };
        tempProperty.addedAdditionalAreas = tempProperty.additionalAreas.filter(
          (additionalArea) => additionalArea.addedFromSalesRoom,
        );
        tempProperty.adminAdditionalAreas = tempProperty.additionalAreas.filter(
          (additionalArea) => !additionalArea.addedFromSalesRoom,
        );
        const group = this.state.response.properties.find((g) => {
          return g[0] ? g[0].groupId === tempProperty.groupId : false;
        });
        const availableProperties = group.filter(
          (p) => p.status === Status.Available,
        );

        const lastProperty =
          availableProperties.length === 1 ? availableProperties[0] : null;

        this.setState({
          id: property.id,
          groupId: property.groupId,
          isOpen: true,
          rightButton: buttons.rightButton,
          leftButton: buttons.leftButton,
          priceSold: property.priceWithIncrement,
          selectedProperty: tempProperty,
          discountApplied: property.discount,
          isLastProperty:
            lastProperty != null && tempProperty.id === lastProperty.id,
        });
      } catch (error) {
        this.props.enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
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
                value={parseFloat(property.priceWithIncrement).toFixed(0)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'price' && (
              <NumberFormat
                value={parseFloat(property.price).toFixed(0)}
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
                value={parseFloat(property.priceWithIncrement).toFixed(0)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            )}
            {active === 'price' && (
              <NumberFormat
                value={parseFloat(property.price).toFixed(0)}
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

  findGroup = (properties) => {
    try {
      const flatGroup = properties.flatMap((group) => group);
      return flatGroup.filter((group) => group.groupId === this.state.groupId);
    } catch (error) {
      this.props.enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  calculateCollectedIncrement(status) {
    const groups = this.state.response.properties;
    let properties = groups[0];
    if (groups.length > 1) {
      properties = this.findGroup(groups);
    }
    return properties.reduce((current, next) => {
      let { price } = next;
      const { manualPrice } = next;
      price = price === 0 && manualPrice > 0 ? manualPrice : price;
      let increment = next.priceSold - price;
      if (
        next.groupId === this.state.groupId &&
        next.status === Status.Sold &&
        next.id !== this.state.id
      ) {
        current += increment;
      } else if (next.id === this.state.id) {
        increment = this.state.priceSold - price;
        current += increment;
      }
      return current;
    }, 0);
  }

  save = (showModalSelectedProperty) => () => {
    if (!showModalSelectedProperty) {
      this.props.onChangeGroup(Number(this.state.selectedProperty.groupName));
      this.props.history.push(
        `${DashboardRoutes.base}${DashboardRoutes.strategy.value}${this.props.match.params.towerId}`,
      );
      return;
    }
    if (
      this.state.selectedProperty.status !== SalesRoomEnum.status.AVAILABLE &&
      !this.modalRenderValidation()
    ) {
      this.setState({ isSavingErrorActive: true });
      return;
    }

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
              ? this.state.selectedProperty.priceWithIncrement
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
          optionalDescription: this.state.optionalDescription,
          collectedIncrement,
          groupId: this.state.groupId,
          isBadgeIncrement,
          deadlineDate: Number(moment(this.state.deadlineDate).format('x')),
          addedAdditionalAreas: this.state.selectedProperty
            .addedAdditionalAreas,
          propertyCollectedIncrement:
            this.state.selectedProperty.priceWithIncrement -
            this.state.selectedProperty.price,
        },
        this.props.match.params.towerId,
        this.props.match.params.clientId,
      )
      .then((response) => {
        const { incrementList } = response.data;
        if (incrementList) {
          this.makeArrayOfProperties(incrementList, this.state.lastSelector);
        }

        this.isModalShowingStatesContent = false;
        this.setState({
          isOpen: false,
          isLoadingModal: false,
          optionalDescription: '',
        });
        this.updateAdditionalAreas();
      })
      .catch((error) => {
        this.props.enqueueSnackbar(error.message, {
          variant: 'error',
        });
        this.updateAdditionalAreas();
        this.setState({ isLoadingModal: false });
      });
  };

  cancel = () => {
    this.isModalShowingStatesContent = false;
    this.setState({ isOpen: false, isSavingErrorActive: false });
    this.updateAdditionalAreas();
  };

  createNullMatrix = (m, n) => {
    return Array(m)
      .fill(null)
      .map(() => Array(n).fill(null));
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

  optionalDescript = (element) => {
    const optionalDescription = element.target.value;
    this.setState({ optionalDescription });
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

  handleCloseGroupingRedirect = () => {
    this.setState({ openGrouping: false });
  };

  modalRenderValidation = () => {
    const isStrategyNull =
      this.state.selectedProperty.isReset ||
      !this.state.selectedProperty.strategy;

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

    return showModalSelectedProperty;
  };

  clientValidation = () => {
    return (
      this.state.selectedProperty.clientId ===
        this.props.match.params.clientId ||
      this.state.selectedProperty.clientId === null
    );
  };

  updateInitialStatus = () => {
    this.isModalShowingStatesContent = true;
  };

  render() {
    let showModalSelectedProperty = this.modalRenderValidation();
    if (
      this.state.selectedProperty.status === SalesRoomEnum.status.SOLD ||
      this.isModalShowingStatesContent
    ) {
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
                {!showModalSelectedProperty &&
                  'Debe escoger una estrategia para poder vender los apartamentos de este grupo 📈'}
                {showModalSelectedProperty && this.state.isLoadingModal && (
                  <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Loader
                      type="ThreeDots"
                      color={variables.mainColor}
                      height="100"
                      width="100"
                    />
                  </div>
                )}
                {showModalSelectedProperty &&
                  !this.state.isLoadingModal &&
                  (this.clientValidation() ? (
                    <SalesRoomModal
                      isLast={this.state.isLastProperty}
                      property={this.state.selectedProperty}
                      onChange={this.propertyHandler}
                      deadlineDate={this.state.deadlineDate}
                      onChangeDeadlineDate={this.deadlineDateHandler}
                      optionalDescription={this.optionalDescript}
                      optionalDescript={this.state.optionalDescription}
                      clientId={this.props.match.params.clientId}
                      additionalAreas={this.state.additionalAreas}
                      addAdditionalAreaHandler={this.addAdditionalArea}
                      deleteAdditionalAreaHandler={this.deleteAdditionalArea}
                      towerId={this.props.match.params.towerId}
                      spawnMessage={this.props.spawnMessage}
                      clientId={this.props.match.params.clientId}
                      isSavingErrorActive={this.state.isSavingErrorActive}
                      updateInitialStatus={this.updateInitialStatus}
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
                    onClick={this.save(showModalSelectedProperty)}
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
        <AlertRedirect
          open={this.state.openGrouping}
          message={'Debes agrupar las áreas antes de vender.'}
          route={`${DashboardRoutes.base}${DashboardRoutes.clustering.value}${this.props.match.params.towerId}`}
          handleClose={this.handleCloseGroupingRedirect}
        />
      </LoadableContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  validGroup: state.strategy.root.selectedGroup,
});

const mapDispatchToProps = {
  onChangeGroup: changeGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDefaultLayout(withSnackbar(SalesRoom)));
