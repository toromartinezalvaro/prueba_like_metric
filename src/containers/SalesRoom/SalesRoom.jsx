import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import NumberFormat from 'react-number-format';
import SalesRoomService from '../../services/salesRoom/salesRoomService';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import variables from '../../assets/styles/variables.scss';
import Selectors from '../../components/SalesRoom/Selectors';
import PropertiesTable from '../../components/SalesRoom/PropertiesTable';
import Message from '../../components/SalesRoom/Message';
import Status from '../../helpers/status';
import LoadableContainer from '../../components/UI/Loader';
import SalesRoomModal from '../../components/SalesRoom/modal';
import SalesRoomEnum from './SalesRoom.enum';
import ReactTooltip from 'react-tooltip';

export default class Detail extends Component {
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
    isHidden: true,
    isLoading: false,
    rightButton: {},
    leftButton: {},
    id: 0,
    groupId: 0,
    priceSold: 0,
    discountApplied: 0,
    isEmpty: null,
    isLoadingModal: false,
    selectedProperty: null,
  };

  propertyHandler = (key, value) => {
    const temp = { ...this.state.selectedProperty };
    temp[key] = value;
    this.setState({ selectedProperty: temp });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getProperties(this.props.match.params.towerId)
      .then((properties) => {
        this.makeArrayOfProperties(properties);
        this.setState({ isLoading: false });
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
    this.setState({
      id: property.id,
      groupId: property.groupId,
      isHidden: false,
      rightButton: buttons.rightButton,
      leftButton: buttons.leftButton,
      priceSold: property.priceWithIncrement,
      selectedProperty: property,
      discountApplied: property.discount,
    });
  };

  makeCells = (buttons, property, active) => (
    <div
      style={{
        backgroundColor: buttons.backgroundColor,
        padding: '0.01em',
        textAlign: 'center',
      }}
      onClick={() => this.onClickSelector(property, buttons)}
    >
      <p
        style={{ fontWeight: 'bold', color: 'White' }}
        data-tip={property.name}
      >
        {active === 'mts2' ? (
          parseFloat(property.mts2).toFixed(2)
        ) : (
          <NumberFormat
            value={parseFloat(property.priceWithIncrement).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        )}
      </p>
      <ReactTooltip />
    </div>
  );

  makeArrayOfProperties(properties, active) {
    const { data } = properties;

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
    const groups = this.state.response.data.properties;
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
        },
        this.props.match.params.towerId,
      )
      .then((properties) => {
        console.log(properties);
        if (properties) {
          this.makeArrayOfProperties(properties);
        }
        this.setState({
          isHidden: true,
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
    this.setState({ isHidden: true });
  };

  createNullMatrix = (m, n) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill());
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.isEmpty && (
          <Message route={this.props.match.params.towerId} />
        )}
        {!this.state.isEmpty && (
          <Card>
            <CardHeader>
              <p>Propiedades</p>
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
            {!this.state.isHidden && (
              <Modal
                title={'Nuevo Estado'}
                hidden={this.props.isHidden}
                onConfirm={this.save}
                onCancel={this.cancel}
              >
                {this.state.isLoadingModal ? (
                  <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Loader
                      type="ThreeDots"
                      color={variables.mainColor}
                      height="100"
                      width="100"
                    />
                  </div>
                ) : (
                  <SalesRoomModal
                    property={this.state.selectedProperty}
                    onChange={this.propertyHandler}
                  />
                )}
              </Modal>
            )}
          </Card>
        )}
      </LoadableContainer>
    );
  }
}
