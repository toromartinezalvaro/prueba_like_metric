import React, { Component } from 'react';
import StrategyServices from '../../services/strategy/StrategyService';
import Line from '../../components/UI/ChartLine/ChartLine';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import styles from '../../assets/styles/variables.scss';
export default class Strategy extends Component {
  constructor(props) {
    super(props);
    this.services = new StrategyServices(this);
  }

  state = {
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
        backgroundColor: styles.softRedColor,
        fill: null,
      },
    ],
  };

  findGroup = (groups, active) => {
    return groups.find(group => {
      return group.type === active.type;
    });
  };

  makeArrayLabels = groupFilter => {
    if (groupFilter !== undefined) {
      if (groupFilter.strategies.length > 0) {
        this.setState({ dataGraph: groupFilter.strategies });
        let dataGraph = groupFilter.strategies;
        console.log(groupFilter.strategies)
        if (dataGraph[0].increments !== undefined) {
          let lengthLabels = dataGraph[0].increments.length;
          return Array.from(Array(lengthLabels), (x, index) => index + 1);
        }
      } else {
        return null;
      }
    }
  };

  makeArrayDataSets = dataGraph => {
    const arrayData = dataGraph.map((line, i) => {
      if (this.state.dataHelper) {
        return {
          data: [...line.increments],
          label: this.state.dataHelper[i].label,
          borderColor: this.state.dataHelper[i].borderColor,
          backgroundColor: this.state.dataHelper[i].backgroundColor,
          fill: this.state.dataHelper[i].fill,
          lineTension: 0.05,
          hidden: true,
        };
      }
    });
    return arrayData;
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getStrategies(this.props.match.params.towerId)
      .then(strategies => {
        const groupFilter = this.findGroup(strategies.data, strategies.data[0]);
        const labels = this.makeArrayLabels(groupFilter);
        const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);
        this.setState({
          isLoading: false,
          groupActive: strategies.data[0],
          currentGroup: arrayDataSets,
          labels: labels,
          groups: strategies.data,
          strategyActive: strategies.data[0].strategy,
        });
      });
  }

  handleClick(type) {
    const groupActive = this.state.groups.find(group => {
      return group.type === type;
    });
    const groupFilter = this.findGroup(this.state.groups, groupActive);
    console.log(groupFilter);
    const labels = this.makeArrayLabels(groupFilter);
    const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);
    if (arrayDataSets.length !== 0) {
      this.setState({
        currentGroup: arrayDataSets,
        labels: labels,
        groupActive: groupActive,
        strategyActive: groupActive.strategy,
      });
    } else {
      this.setState({
        groupActive: groupActive,
      });
    }
  }

  save = () => {
    this.services
      .putStrategy({
        id: this.state.groupActive.id,
        strategy: this.state.strategySelected,
        incrementList: this.state.groupActive.strategies[this.state.index].percentage
      })
      .then(
        console.log("HOLA",this.state.groupActive),
        this.setState({
          hidden: true,
          strategyActive: this.state.strategySelected,
        }),
      )
      .catch(err => console.log(err));
  };

  cancel = () => {
    this.setState({ hidden: true });
    return true;
  };

  render() {
    return (
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {this.state.groups.map(group => (
            <Button onClick={() => this.handleClick(group.type)}>
              {group.type}
            </Button>
          ))}
        </div>
        {this.state.groupActive.strategies.length !== 0 ? (
          <div>
            <Line
              ref={this.chart}
              currentGroup={[...this.state.currentGroup]}
              labels={this.state.labels}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h4>
                Selecciona la estrategia para el {this.state.groupActive.type}
              </h4>
              {this.state.groupActive.strategies.map((group, index) => {
                if (index !== 0) {
                  let styleButton = {
                    backgroundColor: styles.grayColor,
                  };
                  if (
                    this.state.strategyActive ===
                    this.state.dataHelper[index].id
                  ) {
                    styleButton = {
                      backgroundColor: this.state.dataHelper[index].borderColor,
                    };
                  }
                  return (
                    <Button
                      onClick={() => {
                        this.setState({
                          hidden: false,
                          strategySelected: this.state.dataHelper[index].id,
                          index: index
                        });
                      }}
                      style={styleButton}
                    >
                      {this.state.dataHelper[index].label}
                    </Button>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4>
              El {this.state.groupActive.type} no tiene los apartamentos
              suficientes para definir una estrategia.
            </h4>
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
    );
  }
}
