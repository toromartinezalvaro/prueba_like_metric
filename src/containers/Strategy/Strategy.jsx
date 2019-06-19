import React, { Component } from 'react';
import StrategyServices from '../../services/strategy/StrategyService';
import Line from '../../components/UI/ChartLine/ChartLine';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';

export default class Strategy extends Component {
  constructor(props) {
    super(props);
    this.services = new StrategyServices(this);
  }

  state = { data: [], groupActive: "Tipo 2" };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getStrategies(this.props.match.params.towerId)
      .then(strategies => {
        this.setState({ isLoading: false, data: strategies.data });
      });
  }

  handleClick(type) {
    this.setState({groupActive: type})
  }

  render() {
    return (
      <Card>
        <div style={{textAlign: "center", marginBottom: "20px"}}>
          {this.state.data.map(group => (
            <Button onClick={() => this.handleClick(group.type)}>{group.type}</Button>
          ))}
        </div>
        <Line data={this.state.data} groupActive={this.state.groupActive} />
      </Card>
    );
  }
}
