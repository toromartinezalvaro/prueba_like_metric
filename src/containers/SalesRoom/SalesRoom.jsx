import React, { Component } from 'react';
import SalesRoomService from '../../services/salesRoom/salesRoomService';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import variables from '../../assets/styles/variables.scss';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import Selectors from '../../components/SalesRoom/Selectors';
import PropertiesTable from '../../components/SalesRoom/PropertiesTable';
import Message from '../../components/SalesRoom/Message';
import Status from '../../helpers/status';

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
    priceSold: 0,
    isEmpty: null,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getProperties(this.props.match.params.towerId)
      .then(properties => {
        this.makeArrayOfProperties(properties);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  buttonsStyles(status) {
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
  }

  onClickSelector = (property, buttons) => {
    this.setState({
      id: property.id,
      isHidden: false,
      rightButton: buttons.rightButton,
      leftButton: buttons.leftButton,
      priceSold: property.price,
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
      <p style={{ fontWeight: 'bold', color: 'White' }}>
        {active === 'mts2' ? (
          property.mts2
        ) : (
          <NumberFormat
            value={parseFloat(property.price).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        )}
      </p>
    </div>
  );

  makeArrayOfProperties(properties, active) {
    const data = properties.data;
    let arrayOfNulls = [];
    if (data.floors !== null) {
      for (let i = 0; i < data.floors; i++) {
        arrayOfNulls.push([]);
      }
      data.properties.map(properties => {
        properties.map(property => {
          let floor = arrayOfNulls[property.floor - data.lowestFloor];
          const buttons = this.buttonsStyles(property.status);
          floor[property.location - 1] = this.makeCells(
            buttons,
            property,
            active,
          );
          arrayOfNulls[property.floor - data.lowestFloor] = floor;
        });
      });
      this.setState({
        response: properties,
        properties: data.totalProperties,
        floors: data.floors,
        lowestFloor: data.lowestFloor,
        data: arrayOfNulls,
        isEmpty: false,
      });
    } else {
      this.setState({ isEmpty: true });
    }
  }

  save = () => {
    this.setState({ isLoading: true });
    this.services
      .putState(
        {
          id: this.state.id,
          status:
            this.state.rightButton.label === 'Disponible'
              ? Status.Available
              : this.state.rightButton.label === 'Opcionado'
              ? Status.Optional
              : Status.Sold,
          priceSold:
            this.state.rightButton.label !== 'Disponible'
              ? this.state.priceSold
              : null,
        },
        this.props.match.params.towerId,
      )
      .then(properties => {
        if (properties) {
          this.makeArrayOfProperties(properties);
        }
        this.setState({
          isHidden: true,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
    return true;
  };

  saveLeft = () => {
    this.setState({ isLoading: true });
    this.services
      .putState(
        {
          id: this.state.id,
          status:
            this.state.leftButton.label === 'Disponible'
              ? Status.Available
              : this.state.leftButton.label === 'Opcionado'
              ? Status.Optional
              : Status.Sold,
          priceSold:
            this.state.leftButton.label !== 'Disponible'
              ? this.state.priceSold
              : null,
        },
        this.props.match.params.towerId,
      )
      .then(properties => {
        if (properties) {
          this.makeArrayOfProperties(properties);
        }
        this.setState({
          isHidden: true,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
    return true;
  };

  cancel = () => {
    this.setState({ isHidden: true });
  };

  render() {
    return (
      <div>
        {this.state.isEmpty === null ? null : this.state.isEmpty ? (
          <Message route={this.props.match.params.towerId} />
        ) : (
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
            {this.state.isHidden ? null : (
              <Modal
                title={'Nuevo Estado'}
                hidden={this.props.isHidden}
                onConfirm={this.save}
                onConfirmLeft={this.saveLeft}
                onCancel={this.cancel}
                rightButton={this.state.rightButton.label}
                leftButton={this.state.leftButton.label}
                rightColor={this.state.rightButton.color}
                leftColor={this.state.leftButton.color}
              >
                Desea cambiar el estado?
                {this.state.isLoading ? (
                  <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Loader
                      type="ThreeDots"
                      color={variables.mainColor}
                      height="100"
                      width="100"
                    />
                  </div>
                ) : null}
              </Modal>
            )}
          </Card>
        )}
      </div>
    );
  }
}
