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

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new SalesRoomService(this);
  }

  state = {
    properties: 1,
    floors: 1,
    lowestFloor: 1,
    data: [[]],
    isHidden: true,
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

  makeArrayOfProperties(properties) {
    const data = properties.data;
    let arrayOfNulls = [];
    for (let i = 0; i < data.floors; i++) {
      arrayOfNulls.push([]);
    }
    data.properties.map(properties => {
      properties.map(property => {
        let floor = arrayOfNulls[property.floor - data.lowestFloor];
        let backgroundColor;
        let rightButton;
        let leftButton;
        if (property.status === 'AVAILABLE') {
          backgroundColor = variables.greenColor;
          rightButton = { label: 'Vendido', color: variables.mainColor };
          leftButton = { label: 'Opcionado', color: variables.yellowColor };
        } else if (property.status === 'OPTIONAL') {
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
        floor[property.location - 1] = (
          <div
            style={{
              backgroundColor: backgroundColor,
              padding: '0.01em',
              textAlign: 'center',
            }}
            onClick={() => {
              this.setState({
                id: property.id,
                isHidden: false,
                rightButton: rightButton,
                leftButton: leftButton,
                priceSold: property.price,
              });
            }}
          >
            <p style={{ fontWeight: 'bold', color: "White" }}>
              {
                <NumberFormat
                  value={parseFloat(property.price).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              }
            </p>
          </div>
        );
        arrayOfNulls[property.floor - data.lowestFloor] = floor;
      });
    });
    this.setState({
      properties: data.totalProperties,
      floors: data.floors,
      lowestFloor: data.lowestFloor,
      data: arrayOfNulls,
    });
  }

  save = () => {
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
            this.state.rightButton.label !== 'Disponible' ? this.state.priceSold : null,
        },
        this.props.match.params.towerId,
      )
      .then(properties => {
        if (properties) {
          this.makeArrayOfProperties(properties);
        }
        this.setState({
          isHidden: true,
        });
      })
      .catch(err => console.log(err));
    return true;
  };

  cancel = () => {
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
            this.state.leftButton.label !== 'Disponible' ? this.state.priceSold : null,
        },
        this.props.match.params.towerId,
      )
      .then(properties => {
        if (properties) {
          this.makeArrayOfProperties(properties);
        }
        this.setState({
          isHidden: true,
        });
        console.log(properties);
      })
      .catch(err => console.log(err));
    return true;
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <p>Propiedades</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table
              intersect="Propiedades"
              headers={[...Array(this.state.properties).keys()].map(o => o + 1)}
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
            onCancel={this.cancel}
            rightButton={this.state.rightButton.label}
            leftButton={this.state.leftButton.label}
            rightColor={this.state.rightButton.color}
            leftColor={this.state.leftButton.color}
          >
            Desea cambiar el estado?
          </Modal>
        )}
      </Card>
    );
  }
}
