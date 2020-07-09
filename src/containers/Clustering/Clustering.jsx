import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card, { CardBody } from '../../components/UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import ClusteringServices from '../../services/clustering/ClusteringServices';
import GroupTable from '../../components/Clustering/GroupTable/GroupTable';
import styles from './Clustering.module.scss';
import LoadableContainer from '../../components/UI/Loader';
import EmptyProperties from '../../components/Clustering/EmptyContentMessages/EmptyProperties/EmptyPropeties';
import EmptyAreasAndPrices from '../../components/Clustering/EmptyContentMessages/EmptyAreasAndPrices/EmptyAreasAndPrices';
import EmptyPrices from '../../components/Clustering/EmptyContentMessages/EmptyPrices/EmptyPrices';
import PreventAction from '../../components/Clustering/PreventAction';

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
    waitingForResponse: false,
    isLoading: false,
    isEmpty: false,
    isEmptyAreasAndPrices: false,
    message: 0,
    locked: false,
    openDialog: false,
    dataAction: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getClusters(this.props.match.params.towerId)
      .then((response) => {
        if (!Object.keys(response.data).length) {
          return this.setState({ isEmpty: true, isLoading: false });
        }
        if (Object.keys(response.data)[0] === 'message') {
          return this.setState({
            isEmptyAreasAndPrices: true,
            isLoading: false,
          });
        }
        this.setState({
          groupsSize: response.data.towerClustersConfig.groups.length,
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
          isLoading: false,
          locked: response.data.clusters.some(
            (property) => property.status !== 'AVAILABLE',
          ),
          message: response.data.message ? response.data.message.message : 0,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  clusterGroupsHandler = (target) => {
    this.setState({ groupsSize: target.value });
  };

  postClusters = (clusterByArea) => {
    this.setState({ loadingTable: true, waitingForResponse: true });
    this.services
      .postClusters(this.props.match.params.towerId, {
        groups: parseInt(this.state.groupsSize),
        clusterByArea,
      })
      .then((response) => {
        this.setState({
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
          loadingTable: false,
          waitingForResponse: false,
        });
      })
      .catch((error) => {
        this.setState({ loadingTable: false, waitingForResponse: false });
      });
  };

  putType = (id, type) => {
    this.services
      .putType(id, {
        type,
        towerId: this.props.match.params.towerId,
      })
      .then((response) => {
        this.setState({
          towerClusterConfig: response.data.towerClustersConfig,
          clusters: response.data.clusters,
        });
      })
      .catch((error) => {});
  };

  handleClose = () => {
    this.setState({ openDialog: false, dataAction: null });
  };

  handleAction = (action) => {
    this.postClusters(action);
    this.handleClose();
  };

  handleOpenDialog = (action) => {
    this.setState({ openDialog: true, dataAction: action });
  };

  clusteringChecker = (action) => {
    // const checkClustering = this.state.clusters.some(
    //   (property) => property.group.isReset,
    // );
    // if (checkClustering) {
    //   this.handleOpenDialog(action);
    // } else {
      this.handleAction(action);
    // }
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.isEmpty ? (
          <EmptyProperties towerId={this.props.match.params.towerId} />
        ) : null}
        {this.state.isEmptyAreasAndPrices ? (
          <EmptyAreasAndPrices towerId={this.props.match.params.towerId} />
        ) : (
          !this.state.isEmpty && (
            <Card>
              <CardBody>
                <div className={styles.InputContainer}>
                  <div>
                    <span>Numero de grupos:</span>
                  </div>
                  <div>
                    <Input
                      mask="number"
                      validations={[
                        {
                          fn: (value) => value <= this.state.clusters.length,
                          message:
                            'El numero de grupos no puede ser superior al de apartamentos',
                        },
                      ]}
                      style={{ width: '75px' }}
                      onChange={this.clusterGroupsHandler}
                      value={this.state.groupsSize}
                      placeholder="Grupos"
                      forceUpdate={true}
                      disable={this.state.locked || this.state.loadingTable}
                    />
                  </div>
                  {!this.state.locked && (
                    <div>
                      <div style={{ marginBottom: '10px' }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.clusteringChecker(true);
                          }}
                          disabled={
                            this.state.loadingTable ||
                            this.state.groupsSize > this.state.clusters.length
                          }
                        >
                          Agrupar por area
                        </Button>
                      </div>
                      <div>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.clusteringChecker(false);
                          }}
                          disabled={
                            this.state.loadingTable ||
                            this.state.message === 2 ||
                            this.state.groupsSize > this.state.clusters.length
                          }
                        >
                          Agrupar por precio
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {
                  <PreventAction
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    action={this.handleAction}
                    data={this.state.action}
                  />
                }
                {this.state.message === 2 ? (
                  <EmptyPrices
                    towerId={this.props.match.params.towerId}
                  ></EmptyPrices>
                ) : null}
              </CardBody>
            </Card>
          )
        )}
        {this.state.towerClusterConfig.groups.length !== 0 ? (
          <GroupTable
            data={this.state.clusters}
            onTypeChange={this.putType}
            towerClusterConfig={this.state.towerClusterConfig}
            loading={this.state.loadingTable}
            locked={this.state.locked}
          />
        ) : null}
      </LoadableContainer>
    );
  }
}

export default Clustering;
