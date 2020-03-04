import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import StrategyServices from '../../services/strategy/StrategyService';
import Line from '../../components/UI/ChartLine/ChartLine';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import SummaryStrategy from '../../components/Strategy/SummaryStrategy';
import MarketAndSelectStrategy from '../../components/Strategy/MarketAndSelectStrategy';
import styles from '../../assets/styles/variables.scss';
import { DashboardRoutes } from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';
import IncrementsServices from '../../services/increments/IncrementsServices';

export default class Strategy extends Component {
  constructor(props) {
    super(props);
    this.services = new StrategyServices(this);
    this.incrementServices = new IncrementsServices(this);
  }

  state = {
    market: { averagePrice: 0, anualEffectiveIncrement: 0 },
    groupActive: { type: '', strategies: [] },
    currentGroup: {},
    groups: [],
    groupFilter: [],
    labels: [],
    staticGroups: [],
    hidden: true,
    strategySelected: 0,
    strategyActive: 0,
    index: 0,
    salesStartDate: 0,
    dataHelper: [
      { label: ['Mercado'], borderColor: '' },
      {
        id: 1,
        label: ['Continua'],
        borderColor: styles.mainColor,
        backgroundColor: styles.softMainColor,
        fill: null,
      },
      {
        id: 3,
        label: ['Semi-Continua'],
        borderColor: styles.greenColor,
        backgroundColor: styles.softGreenColor,
        fill: null,
      },
      {
        id: 9,
        label: ['Semi-Escalonada'],
        borderColor: styles.redColor,
        backgroundColor: styles.softRedColor,
        fill: null,
      },
      {
        id: 18,
        label: ['Escalonada'],
        borderColor: styles.yellowColor,
        backgroundColor: styles.softYellowColor,
        fill: null,
      },
    ],
  };

  findGroup = (groups, active) => {
    return groups.find((group) => {
      return group.type === active.type;
    });
  };

  makeArrayLabels = (groupFilter) => {
    if (groupFilter !== undefined) {
      if (groupFilter.strategies.length > 0) {
        this.setState({ dataGraph: groupFilter.strategies });
        const dataGraph = groupFilter.strategies;
        console.log('dataGraph', dataGraph);
        if (dataGraph[0] !== undefined) {
          let lengths;
          if (dataGraph[1] !== undefined) {
            lengths = [dataGraph[1].increments.length];
          } else {
            lengths = [dataGraph[0].increments.length];
          }
          const initialMonth = groupFilter.initialMonth || Date.now();
          return Array(_.max(lengths))
            .fill(null)
            .map((_, index) => {
              return moment(Number(initialMonth))
                .add(index, 'months')
                .format('MM/YY');
            });
        }
      } else {
        return null;
      }
    }
  };

  selectStrategy = (index, strategySelected) => {
    this.setState({
      hidden: false,
      strategySelected,
      index,
    });
  };

  makeArrayDataSets = (dataGraph) => {
    const arrayData = dataGraph.map((line, i) => {
      if (this.state.dataHelper) {
        const INCREMENTS_FIXED = line.increments.map(
          (increment) => increment && increment.toFixed(2),
        );
        return {
          data: [...INCREMENTS_FIXED],
          label: this.state.dataHelper[i].label,
          borderColor: this.state.dataHelper[i].borderColor,
          backgroundColor: this.state.dataHelper[i].backgroundColor,
          fill: this.state.dataHelper[i].fill,
          lineTension: 0.05,
        };
      }
    });
    return arrayData;
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getStrategies(this.props.match.params.towerId)
      .then((strategies) => {
        if (strategies.data !== {}) {
          let startDate = Date.now();
          if (strategies.data.salesStartDate !== undefined) {
            startDate = strategies.data.salesStartDate;
          }
          this.setState({ salesStartDate: startDate });
          const groupFilter = this.findGroup(
            strategies.data.increments,
            strategies.data.increments[0],
          );
          const labels = this.makeArrayLabels(groupFilter);
          const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);
          return this.setState({
            isLoading: false,
            groupActive: strategies.data.increments[0],
            currentGroup: arrayDataSets,
            labels,
            groups: strategies.data.increments,
            strategyActive: strategies.data.increments[0].strategy,
          });
        }
      })
      .catch((err) =>
        this.setState({
          isLoading: false,
        }),
      );
    this.incrementServices
      .getMarket(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ market: response.data });
      });
  }

  handleClick(type) {
    const groupActive = this.state.groups.find((group) => {
      return group.type === type;
    });
    const groupFilter = this.findGroup(this.state.groups, groupActive);
    const labels = this.makeArrayLabels(groupFilter);
    const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);
    console.log(groupActive);
    if (arrayDataSets.length !== 0) {
      this.setState({
        currentGroup: arrayDataSets,
        labels,
        groupActive,
        strategyActive: groupActive.strategy,
      });
    } else {
      this.setState({
        groupActive,
      });
    }
  }

  save = () => {
    const arrayOfIncrementList = this.state.groupActive.strategies.reduce(
      (current, next) => {
        if (next.id) {
          current.push(next.percentage);
        }
        return current;
      },
      [],
    );
    this.services
      .putStrategy({
        id: this.state.groupActive.id,
        strategy: this.state.strategySelected,
        incrementList: this.state.groupActive.strategies[this.state.index]
          .percentage,
        arrayIncrementList: arrayOfIncrementList,
      })
      .then((res) => {
        return this.services.getStrategies(this.props.match.params.towerId);
      })
      .then((strategies) => {
        const tempGroupActive = this.state.groupActive;
        tempGroupActive.isReset = false;
        this.setState({
          hidden: true,
          strategyActive: this.state.strategySelected,
          groupActive: tempGroupActive,
          groups: strategies.data.increments,
        });
      })
      .catch((err) => console.log(err));
  };

  cancel = () => {
    this.setState({ hidden: true });
    return true;
  };

  putMarketAveragePrice = (groupId, averagePrice) => {
    this.setState({ isLoading: true });
    this.incrementServices
      .putMarketAveragePrice(groupId, {
        averagePrice,
        length: this.state.labels.length - 1,
      })
      .then((res) => {
        this.changeMarketAveragePrice(averagePrice);
        this.setState((prevState) => {
          const tempGroupActive = { ...prevState.groupActive };
          const market = res.data[0];
          tempGroupActive.strategies[0] = market;
          const arrayDataSets = this.makeArrayDataSets(
            tempGroupActive.strategies,
          );
          return { isLoading: false, currentGroup: arrayDataSets };
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  changeMarketAveragePrice = (averagePrice) => {
    this.setState((prevState) => {
      const tempGroupActive = { ...prevState.groupActive };
      tempGroupActive.marketDefinitions.averagePrice = averagePrice;
      return { groupActive: tempGroupActive };
    });
  };

  changeMarketAnnualEffectiveIncrement = (anualEffectiveIncrement) => {
    this.setState((prevState) => {
      const tempGroupActive = { ...prevState.groupActive };
      tempGroupActive.marketDefinitions.anualEffectiveIncrement = anualEffectiveIncrement;
      return { groupActive: tempGroupActive };
    });
  };

  putMarketAnnualEffectiveIncrement = (groupId, anualEffectiveIncrement) => {
    this.setState({ isLoading: true });
    this.incrementServices
      .putMarketAnualEffectiveIncrement(groupId, {
        anualEffectiveIncrement,
        length: this.state.labels.length - 1,
      })
      .then((res) => {
        this.changeMarketAnnualEffectiveIncrement(
          anualEffectiveIncrement / 100,
        );
        this.setState((prevState) => {
          const tempGroupActive = { ...prevState.groupActive };
          const market = res.data[0];
          tempGroupActive.strategies[0] = market;
          const arrayDataSets = this.makeArrayDataSets(
            tempGroupActive.strategies,
          );
          return { isLoading: false, currentGroup: arrayDataSets };
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <Card style={{ marginTop: '-30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {this.state.groups.map((group) =>
              group.type === this.state.groupActive.type ? (
                <Button onClick={() => this.handleClick(group.type)}>
                  {group.type}
                </Button>
              ) : (
                <Button
                  onClick={() => this.handleClick(group.type)}
                  style={{ backgroundColor: styles.grayColor }}
                >
                  {group.type}
                </Button>
              ),
            )}
          </div>
          {this.state.groups.length > 0 ? (
            this.state.groupActive.strategies.length !== 0 ? (
              <div>
                <Line
                  ref={this.chart}
                  currentGroup={[...this.state.currentGroup]}
                  labels={this.state.labels}
                />
                <MarketAndSelectStrategy
                  dataHelper={this.state.dataHelper}
                  groupActive={this.state.groupActive}
                  strategyActive={this.state.strategyActive}
                  selectStrategy={this.selectStrategy}
                  putMarketAveragePrice={this.putMarketAveragePrice}
                  putMarketAnnualEffectiveIncrement={
                    this.putMarketAnnualEffectiveIncrement
                  }
                  changeMarketAnnualEffectiveIncrement={
                    this.changeMarketAnnualEffectiveIncrement
                  }
                  changeMarketAveragePrice={this.changeMarketAveragePrice}
                />
                <SummaryStrategy
                  groups={this.state.groups}
                  helper={this.state.dataHelper}
                />
              </div>
            ) : null
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h4>
                Antes de poder ver las estrategias necesita realizar el
                agrupamiento y los incrementos
              </h4>
              <Link
                to={
                  `${DashboardRoutes.base}/clustering` +
                  `/${this.props.match.params.towerId}`
                }
              >
                <Button>
                  Ir a Agrupamiento <i className="fas fa-angle-double-right" />
                </Button>
              </Link>
              <Link
                to={
                  `${DashboardRoutes.base}/increments` +
                  `/${this.props.match.params.towerId}`
                }
              >
                <Button>
                  Ir a Incrementos <i className="fas fa-angle-double-right" />
                </Button>
              </Link>
            </div>
          )}
          {this.state.hidden ? null : (
            <Modal
              title={'Seleccionar estrategia'}
              hidden={this.state.hidden}
              onConfirm={this.save}
              onCancel={this.cancel}
            >
              Deseas definir esta estrategia?
            </Modal>
          )}
        </Card>
      </LoadableContainer>
    );
  }
}
