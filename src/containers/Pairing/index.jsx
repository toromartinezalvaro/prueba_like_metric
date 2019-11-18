import React, { Component } from 'react';
import _ from 'lodash';
import PairingServices from '../../services/pairing';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import SummaryTable from '../../components/Pairing/SummaryTable';
import PairingTable from '../../components/Pairing/ParingTable';
import Styles from './Paring.module.scss';

class Pairing extends Component {
  constructor(props) {
    super(props);
    this.services = new PairingServices();
  }

  state = {
    properties: [],
    areas: [],
  };

  componentDidMount() {
    this.services
      .getData(this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          properties: _.sortBy(response.data.tower.properties, [
            'floor',
            'location',
          ]),
          areas: response.data.additionalAreas,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static propTypes = {};

  render() {
    return (
      <Card>
        <CardHeader>
          <span>Apareamiento</span>
        </CardHeader>
        <CardBody>
          <div className={Styles.container}>
            <div className={Styles.summary}>
              <SummaryTable properties={this.state.properties} />
            </div>
            <div className={Styles.pairing}>
              <PairingTable properties={this.state.properties} />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Pairing;
