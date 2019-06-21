import React, { Component, Fragment } from 'react';
import Card, { CardBody } from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import ClusteringServices from '../../services/clustering/ClusteringServices';
import GroupTable from '../../components/Clustering/GroupTable/GroupTable';
import styles from './Clustering.module.scss';

class Clustering extends Component {
  constructor(props) {
    super(props);
    this.services = new ClusteringServices(this);
  }

  state = {
    groupsSize: 0,
    towerClusterConfig: {
      clusterByArea: true,
      groups: [],
    },
    clusters: [],
    loadingTable: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getClusters(this.props.match.params.towerId)
      .then(response => {
        this.setState({
          groupsSize: response.data.towerClustersConfig.groups.length,
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  clusterGroupsHandler = target => {
    this.setState({ groupsSize: target.value });
  };

  postClusters = clusterByArea => {
    this.setState({ loadingTable: true });
    this.services
      .postClusters(this.props.match.params.towerId, {
        groups: parseInt(this.state.groupsSize),
        clusterByArea,
      })
      .then(response => {
        this.setState({
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
          loadingTable: false,
        });
      })
      .catch(error => {
        this.setState({ loadingTable: false });
      });
  };

  putType = (id, type) => {
    this.services
      .putType(id, {
        type,
        towerId: this.props.match.params.towerId,
      })
      .then(response => {
        this.setState({
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
        });
      })
      .catch(error => {});
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
                  onChange={this.clusterGroupsHandler}
                  value={this.state.groupsSize}
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
        {this.state.towerClusterConfig.groups.length !== 0 ? (
          <GroupTable
            data={this.state.clusters}
            onTypeChange={this.putType}
            towerClusterConfig={this.state.towerClusterConfig}
            loading={this.state.loadingTable}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Clustering;
