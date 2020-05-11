import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loader from 'react-loader-spinner';
import PairingServices from '../../services/pairing';
import Loading from '../../components/UI/Loader';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import SummaryTable from '../../components/Pairing/SummaryTable';
import PairingTable from '../../components/Pairing/ParingTable';
import Styles from './Paring.module.scss';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import commonStyles from '../../assets/styles/variables.scss';

class Pairing extends Component {
  constructor(props) {
    super(props);
    this.services = new PairingServices();
  }

  static propTypes = {
    spawnMessage: PropTypes.func.isRequired,
  };

  state = {
    properties: [],
    areas: [],
    loadingContainer: false,
    loadingPropertiesData: false,
  };

  componentDidMount() {
    this.setState({ loadingContainer: true });
    this.services
      .getData(this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          properties: _.sortBy(response.data.tower.properties, [
            'floor',
            'location',
          ]),
          areas: response.data.additionalAreas,
          loadingContainer: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.response === undefined) {
          this.props.spawnMessage('Error de conexión', 'error');
        } else {
          this.props.spawnMessage(error.response.data.message, 'error');
        }
      });
  }

  getData = () => {
    this.services
      .getData(this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          properties: _.sortBy(response.data.tower.properties, [
            'floor',
            'location',
          ]),
          areas: response.data.additionalAreas,
          loadingContainer: false,
          loadingPropertiesData: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingContainer: false,
          loadingPropertiesData: false,
        });
        if (error.response === undefined) {
          this.props.spawnMessage('Error de conexión', 'error');
        } else {
          this.props.spawnMessage(error.response.data.message, 'error');
        }
      });
  };

  handleAddArea = (propertyId, areaId) => {
    this.setState({ loadingPropertiesData: true });
    this.services
      .addArea(propertyId, areaId)
      .then(() => {
        this.getData();
        this.props.spawnMessage('Se agrego el area correctamente', 'success');
      })
      .catch((error) => {
        this.props.spawnMessage(error.response.data.message, 'error');
        this.setState({ loadingPropertiesData: false });
      });
  };

  handleRemoveArea = (areaId) => {
    this.setState({ loadingPropertiesData: true });
    this.services
      .removeArea(areaId)
      .then(() => {
        this.getData();
        this.props.spawnMessage('Se elimino correctemente el area', 'success');
      })
      .catch((error) => {
        this.props.spawnMessage(error.response.data.message, 'error');
        this.setState({ loadingPropertiesData: false });
      });
  };

  render() {
    return (
      <Loading isLoading={this.state.loadingContainer}>
        <Card>
          <CardHeader>
            <span>Apareamiento</span>
          </CardHeader>
          <CardBody>
            {this.state.loadingPropertiesData ? (
              <div className={Styles.loaderContainer}>
                <Loader
                  type="ThreeDots"
                  color={commonStyles.mainColor}
                  height="100"
                  width="100"
                />
              </div>
            ) : (
              <div className={Styles.container}>
                <div className={Styles.summary}>
                  <SummaryTable properties={this.state.properties} />
                </div>
                <div className={Styles.pairing}>
                  <PairingTable
                    properties={this.state.properties}
                    areas={this.state.areas}
                    addAreaHandler={this.handleAddArea}
                    removeAreaHandler={this.handleRemoveArea}
                  />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </Loading>
    );
  }
}

export default withDefaultLayout(Pairing);
