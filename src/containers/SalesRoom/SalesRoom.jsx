import React, { Component } from 'react';
import SalesRoomService from '../../services/salesRoom/salesRoomService';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Modal from '../../components/UI/Modal/Modal';
import _ from 'lodash';
import variables from '../../assets/styles/variables.scss';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import Button from '../../components/UI/Button/Button';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new SalesRoomService(this);
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
  };
  componentDidMount() {
    this.services
      .getProperties(this.props.match.params.towerId)
      .then(properties => {
        this.makeArrayOfProperties(properties);
      });
  }

  buttonsStyles(status) {
    let backgroundColor;
    let rightButton;
    let leftButton;
    if (status === 'AVAILABLE') {
      backgroundColor = variables.greenColor;
      rightButton = { label: 'Vendido', color: variables.mainColor };
      leftButton = { label: 'Opcionado', color: variables.yellowColor };
    } else if (status === 'OPTIONAL') {
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
  }

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
    });
  }

  save = () => {
    this.setState({ isLoading: true });
    this.services
      .putState(
        {
          id: this.state.id,
          status:
            this.state.rightButton.label === 'Disponible'
              ? 'AVAILABLE'
              : this.state.rightButton.label === 'Opcionado'
              ? 'OPTIONAL'
              : 'SOLD',
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
              ? 'AVAILABLE'
              : this.state.leftButton.label === 'Opcionado'
              ? 'OPTIONAL'
              : 'SOLD',
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
        <Card>
          <CardHeader>
            <p>Propiedades</p>
          </CardHeader>
          <CardBody>
            <div>
              <Button
                onClick={() => {
                  this.makeArrayOfProperties(this.state.response, 'price');
                }}
              >
                Precio
              </Button>
              <Button
                onClick={() => {
                  this.makeArrayOfProperties(this.state.response, 'mts2');
                }}
              >
                Mt2
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: variables.greenColor,
                  width: '16px',
                  height: '16px',
                  marginRight: '4px',
                }}
              />
              <div style={{ fontSize: '14px', marginRight: '14px' }}>
                Disponible
              </div>
              <div
                style={{
                  backgroundColor: variables.yellowColor,
                  width: '16px',
                  height: '16px',
                  marginRight: '4px',
                }}
              />
              <div style={{ fontSize: '14px', marginRight: '14px' }}>
                Opcionado
              </div>
              <div
                style={{
                  backgroundColor: variables.mainColor,
                  width: '16px',
                  height: '16px',
                  marginRight: '4px',
                }}
              />
              <div style={{ fontSize: '14px', marginRight: '14px' }}>
                Vendido
              </div>
            </div>
            <div>
              <Table
                intersect="Propiedades"
                headers={[...Array(this.state.properties).keys()].map(
                  o => o + 1,
                )}
                columns={[...Array(this.state.floors).keys()].map(
                  o => o + this.state.lowestFloor,
                )}
                data={this.state.data}
              />
            </div>
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
      </div>
    );
  }
}
