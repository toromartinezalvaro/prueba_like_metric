import React, { Component } from 'react';
import StrategyServices from '../../services/strategy/StrategyService';
import Line from '../../components/UI/ChartLine/ChartLine';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
export default class Strategy extends Component {
  constructor(props) {
    super(props);
    this.services = new StrategyServices(this);
  }

  state = {
    groupActive: { type: '0', strategies: [] },
    currentGroup: {},
    groups: [],
    groupFilter: [],
    labels: [],
    staticGroups: [],
    hidden: true,
    strategyActive: 0,
    dataHelper: [
      /*       { label: ['Mercado'], borderColor: '' },
       */ {
        id: 1,
        label: ['Continua'],
        borderColor: '#29339B',
        backgroundColor: '#8A8FC8',
        fill: null
      },
      {
        id: 3,
        label: ['Semi-Continua'],
        borderColor: '#018E42',
        backgroundColor: '#74C197',
        fill: null
      },
      {
        id: 9,
        label: ['Semi-Escalonada'],
        borderColor: '#EE2E31',
        backgroundColor: '#F58D8E',
        fill: null
      },
      {
        id: 18,
        label: ['Escalonada'],
        borderColor: '#FFC857',
        backgroundColor: '#FFE1A3',
        fill: null
      }
    ]
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
        if (dataGraph[0] !== undefined) {
          let lengthLabels = dataGraph[0].length;
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
          data: [...line],
          label: this.state.dataHelper[i].label,
          borderColor: this.state.dataHelper[i].borderColor,
          backgroundColor: this.state.dataHelper[i].backgroundColor,
          fill: this.state.dataHelper[i].fill,
          lineTension: 0.05,
          hidden: true
        };
      }
    });

    console.log('groups array ', arrayData);
    return arrayData;
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getStrategies(this.props.match.params.towerId)
      .then(strategies => {
        console.log('strategies.data', strategies.data);
        const groupFilter = this.findGroup(strategies.data, strategies.data[0]);
        const labels = this.makeArrayLabels(groupFilter);
        const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);
        this.setState({
          isLoading: false,
          groupActive: strategies.data[0],
          currentGroup: arrayDataSets,
          labels: labels,
          groups: strategies.data
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
        groupActive: groupActive
      });
    } else {
      this.setState({
        groupActive: groupActive
      });
    }
  }

  save = () => {
    this.services
      .putStrategy({ id: this.state.groupActive.id, strategy: this.state.strategyActive })
      .then(this.setState({ hidden: true }))
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
                console.log('group', this.state.groupActive.id);
                if (index !== -1) {
                  return (
                    <Button
                      onClick={() => {
                        this.setState({ hidden: false, strategyActive: this.state.dataHelper[index]
                          .id });
                      }}
                      style={{
                        backgroundColor: this.state.dataHelper[index]
                          .borderColor
                      }}
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
            Al escoger esta estrategia no podra volver a cambiarla <br /> deseas
            continuar?
          </Modal>
        )}
      </Card>
    );
  }
}
