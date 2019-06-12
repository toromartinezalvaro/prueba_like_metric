import React, { Component, Fragment } from 'react';
import Card, { CardBody } from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import ClusteringServices from '../../services/clustering/ClusteringServices';
import PropertiesGraph from '../../components/Clustering/PropertiesGraph/PropertiesGraph';
import GroupTable from '../../components/Clustering/GroupTable/GroupTable';
import styles from './Clustering.module.scss';

class Clustering extends Component {
  constructor(props) {
    super(props);
    this.services = new ClusteringServices(this);
  }

  state = {
    clusterGroups: 1,

    clusters: [
      {
        id: 1,
        name: '201',
        area: 123,
        price: 456,
        areaGroup: 'Tipo 2',
        priceGroup: 'Tipo 3',
      },
    ],
  };

  componentDidMount() {
    this.services
      .getClusters(
        'pbEqAg883riKOrn43Y5KfgnvWgA1PQIpDP2dMXgnUZ3kkVMg6OFbMBeK9W1n',
      )
      .then(response => {
        console.log(response.data);
      });
  }

  clusterGroupsHandler = event => {
    this.setState({ clusterGroups: event.target.value });
  };

  postClusters = clusterByArea => {
    this.services
      .postClusters(
        'pbEqAg883riKOrn43Y5KfgnvWgA1PQIpDP2dMXgnUZ3kkVMg6OFbMBeK9W1n',
        { groups: this.state.clusterGroups, clusterByArea },
      )
      .then(response => {
        this.setState({ clusters: response });
      });
  };

  putType = (id, type) => {
    console.log('Enviando el nuevo tipo para la propiedad', id, type);
    //this.services.putType(id, { type });
  };

  render() {
    return (
      <Fragment>
        <Card>
          <CardBody>
            <div className={styles.InputContainer}>
              <div>
                <span>Numero de grupos:</span>
              </div>
              <div>
                <Input
                  mask="number"
                  validations={[]}
                  style={{ width: '75px' }}
                  onChange={this.firstFeeHandler}
                  value={this.state.clusterGroups}
                  placeholder="Grupos"
                />
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.postClusters(true);
                  }}
                >
                  Agrupar por area
                </Button>
                <Button
                  onClick={() => {
                    this.postClusters(false);
                  }}
                >
                  Agrupar por precio
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <GroupTable data={this.state.clusters} onTypeChange={this.putType} />
      </Fragment>
    );
  }
}

export default Clustering;
