import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import commonStyles from '../../assets/styles/variables.scss';
import Modal from '../../components/UI/Modal/Modal';
import IncrementsTable from '../../components/Increments/IncrementTable';
import IncrementsChart from '../../components/Increments/IncrementsChart/IncrementsChart';
import IncrementsServices from '../../services/increments/IncrementsServices';
import LoadableContainer from '../../components/UI/Loader';
import Styles from './Increments.module.scss';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import SimpleSnackbar from '../../components/UI2/ToastAlert/ToastAlert';

class Increments extends Component {
  constructor(props) {
    super(props);
    this.services = new IncrementsServices(this);
  }

  state = {
    schedule: {
      endOfSalesDate: new Date().getTime(),
    },
    market: { averagePrice: 0, anualEffectiveIncrement: 0 },
    increments: [],
    graphData: [],
    isLoading: false,
    isLoadingIncrements: false,
    isEmpty: false,
    hidden: true,
    loadingAPI: false,
    isShowBadgeAlert: false,
    alert: {
      opened: false,
      message: '',
    },
  };

  resetStrategy = (groupId) => {
    this.setState({ loadingAPI: true });
    this.services.resetStrategy(groupId).then(() => {
      const tempIncrements = this.state.increments;
      const group = tempIncrements.find((g) => groupId === g.id);
      group.isReset = true;
      this.setState({ loadingAPI: false, increments: tempIncrements });
    });
  };

  toastAlert = (message) => {
    this.setState({ alert: { opened: true, message } });
    setTimeout(() => {
      this.setState({ alert: { opened: false, message } });
    }, 500);
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
      isShowBadgeAlert: this.props.isBadgeIncrement,
    });
    this.updateIncrements();
  }

  futureSalesSpeedHandler = (id, value) => {
    this.setState({ loadingAPI: true });

    this.services
      .putFutureSalesSpeeds(id, value)
      .then(() => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingAPI: false });
        this.toastAlert(error);
      });
  };

  updateIncrements = () => {
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then((response) => {
        const filteredIncrements = response.data.increments.filter(
          (increment) => increment.total.units > 0,
        );
        this.setState({
          schedule: response.data.schedule,
          increments: filteredIncrements,
          market: response.data.market,
          isLoading: false,
          loadingAPI: false,
        });
        this.props.activateBadgeIncrement(false);
      })
      .catch((error) => {
        this.setState({ isLoading: false, loadingAPI: false });
        this.toastAlert(error);
      });
  };

  putSalesSpeed = (id, retentionMonths, index) => {
    this.setState({ loadingAPI: true });
    this.services
      .putSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        this.setState({ loadingAPI: false });
        this.toastAlert(error);
      });
  };

  putSuggestedEffectiveAnnualInterestRate = (
    id,
    effectiveAnnualInterestRate,
    index,
  ) => {
    this.setState({ loadingAPI: true });
    this.services
      .putSuggestedEffectiveAnnualInterestRate(id, {
        effectiveAnnualInterestRate: parseFloat(effectiveAnnualInterestRate),
      })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        this.setState({ loadingAPI: false });
        if (error.response === undefined) {
          this.props.spawnMessage('Error de conexión', 'error');
        } else {
          this.props.spawnMessage(error.response.data.message, 'error');
        }
      });
  };

  putIncrement = (id, increment, inventoryUnits, collectedIncrement) => {
    if (inventoryUnits === 1 && increment !== collectedIncrement.toFixed(2)) {
      this.setState({ hidden: false });
    } else {
      this.setState({ loadingAPI: true });
      this.services
        .putIncrement(this.props.match.params.towerId, {
          groupId: id,
          increment: parseFloat(increment),
        })
        .then((response) => {
          this.updateIncrements();
        })
        .catch((error) => {
          this.setState({ loadingAPI: false });
          if (error.response === undefined) {
            this.props.spawnMessage('Error de conexión', 'error');
          } else {
            this.props.spawnMessage(error.response.data.message, 'error');
          }
        });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      loadingAPI: true,
      increments: [],
      hidden: !prevState.hidden,
    }));
    this.updateIncrements();
  };

  toggleBadgeModal = () => {
    this.setState((prevState) => ({
      isShowBadgeAlert: !prevState.isShowBadgeAlert,
    }));
  };

  getPeriodsIncrements = () => {
    this.setState({ loadingAPI: true });
    this.services
      .getPeriodsIncrements(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ graphData: response.data, loadingAPI: false });
      })
      .catch((error) => {
        this.toastAlert(error);
        this.setState({ loadingAPI: false });
      });
  };

  putMarketAveragePrice = (averagePrice) => {
    this.setState({ loadingAPI: true });
    this.services
      .putMarketAveragePrice(this.props.match.params.towerId, {
        averagePrice,
      })
      .then(() => {
        this.setState({ loadingAPI: false });
      })
      .catch((error) => {
        this.toastAlert(error);
        this.setState({ loadingAPI: false });
      });
  };

  putMarketAnnualEffectiveIncrement = (anualEffectiveIncrement) => {
    this.setState({ loadingAPI: true });
    this.services
      .putMarketAnualEffectiveIncrement(this.props.match.params.towerId, {
        anualEffectiveIncrement,
      })
      .then(() => {
        this.setState({ loadingAPI: false });
      })
      .catch((error) => {
        this.toastAlert(error);
        this.setState({ loadingAPI: false });
      });
  };

  putSuggestedSalesSpeed = (id, retentionMonths, index) => {
    this.setState({ loadingAPI: true });
    this.services
      .putSuggestedSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        this.setState({ loadingAPI: false });
        this.toastAlert(error);
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.loadingAPI ? (
          <div className={Styles.loaderContainer}>
            <Loader
              type="ThreeDots"
              color={commonStyles.mainColor}
              height="100"
              width="100"
            />
          </div>
        ) : null}
        {this.state.isShowBadgeAlert && (
          <Modal title="Alerta!" onConfirm={this.toggleBadgeModal} onlyConfirm>
            El incremento recaudado de uno o más grupos es mayor a la meta
          </Modal>
        )}
        <IncrementsTable
          data={this.state.increments}
          putIncrement={this.putIncrement}
          putSalesSpeed={this.putSalesSpeed}
          putSuggestedSalesSpeed={this.putSuggestedSalesSpeed}
          putSuggestedEffectiveAnnualInterestRate={
            this.putSuggestedEffectiveAnnualInterestRate
          }
          futureSalesSpeedHandler={this.futureSalesSpeedHandler}
          resetStrategy={this.resetStrategy}
          towerId={this.props.match.params.towerId}
          endOfSalesDate={this.state.schedule.endOfSalesDate}
          {...this.props}
        />

        {this.state.hidden ? null : (
          <Modal
            title="Error de incremento"
            hidden={this.state.hidden}
            onConfirm={this.toggleModal}
            onlyConfirm
          >
            Solo queda 1 unidad en el inventario. El incremento solo puede ser
            el que esta actualmente o el recaudado
          </Modal>
        )}

        <SimpleSnackbar
          message={this.state.alert.message}
          opened={this.state.alert.opened}
        />
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(Increments);
