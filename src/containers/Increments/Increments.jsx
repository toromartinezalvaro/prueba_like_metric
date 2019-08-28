import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import commonStyles from '../../assets/styles/variables.scss';
import Modal from '../../components/UI/Modal/Modal';
import IncrementsTable from '../../components/Increments/IncrementTable';
import IncrementsMarket from '../../components/Increments/IncrementsMarket/IncrementsMarket';
import IncrementsChart from '../../components/Increments/IncrementsChart/IncrementsChart';
import IncrementsServices from '../../services/increments/IncrementsServices';
import LoadableContainer from '../../components/UI/Loader';
import Styles from './Increments.module.scss';

class Increments extends Component {
  constructor(props) {
    super(props);
    this.services = new IncrementsServices(this);
  }

  state = {
    market: { averagePrice: 0, anualEffectiveIncrement: 0 },
    increments: [],
    graphData: [],
    isLoading: false,
    isLoadingIncrements: false,
    isEmpty: false,
    hidden: true,
    loadingAPI: true,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.updateIncrements();
  }

  updateIncrements = () => {
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          increments: response.data.increments,
          market: response.data.market,
          isLoading: false,
          loadingAPI: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, loadingAPI: false });
        console.error(error);
      });
  };

  putSalesSpeed = (id, retentionMonths, index) => {
    this.setState({ isLoading: true });
    this.services
      .putSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putSuggestedEffectiveAnnualInterestRate = (
    id,
    effectiveAnnualInterestRate,
    index,
  ) => {
    this.setState({ isLoading: true });
    this.services
      .putSuggestedEffectiveAnnualInterestRate(id, {
        effectiveAnnualInterestRate,
      })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putIncrement = (id, increment, inventoryUnits, collectedIncrement) => {
    if (inventoryUnits === 1 && increment !== collectedIncrement.toFixed(2)) {
      this.setState({ hidden: false });
    } else {
      this.setState({ isLoading: true });
      this.services
        .putIncrement(this.props.match.params.towerId, {
          groupId: id,
          increment,
        })
        .then((response) => {
          this.updateIncrements();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isLoading: true,
      increments: [],
      hidden: !prevState.hidden,
    }));
    this.updateIncrements();
  };

  getPeriodsIncrements = () => {
    this.setState({ isLoading: true });
    this.services
      .getPeriodsIncrements(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ graphData: response.data, isLoading: false });
      });
  };

  putMarketAveragePrice = (averagePrice) => {
    this.setState({ isLoading: true });
    this.services
      .putMarketAveragePrice(this.props.match.params.towerId, {
        averagePrice,
      })
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  putMarketAnnualEffectiveIncrement = (anualEffectiveIncrement) => {
    this.setState({ loadingAPI: true });
    this.services
      .putMarketAnualEffectiveIncrement(this.props.match.params.towerId, {
        anualEffectiveIncrement,
      })
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
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
        console.error(error);
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <div className={Styles.Loader}>
          <Loader type="ThreeDots" color={commonStyles.mainColor} />
        </div>
        <IncrementsTable
          data={this.state.increments}
          putIncrement={this.putIncrement}
          putSalesSpeed={this.putSalesSpeed}
          putSuggestedSalesSpeed={this.putSuggestedSalesSpeed}
          putSuggestedEffectiveAnnualInterestRate={
            this.putSuggestedEffectiveAnnualInterestRate
          }
        />
        <IncrementsMarket
          putMarketAveragePrice={this.putMarketAveragePrice}
          putMarketAnnualEffectiveIncrement={
            this.putMarketAnnualEffectiveIncrement
          }
          marketData={this.state.market}
        />
        <IncrementsChart
          salesStartDate={new Date().getTime()}
          data={this.state.graphData}
          getData={this.getPeriodsIncrements}
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
      </LoadableContainer>
    );
  }
}

export default Increments;
