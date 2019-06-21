import React, { Component } from "react";
import StrategyServices from "../../services/strategy/StrategyService";
import Line from "../../components/UI/ChartLine/ChartLine";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
let groups = [];
export default class Strategy extends Component {
  constructor(props) {
    super(props);
    this.services = new StrategyServices(this);
    this.chart = React.createRef();
  }

  state = { groupActive: { strategies: [] } };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getStrategies(this.props.match.params.towerId)
      .then(strategies => {
        groups = strategies.data;
        this.setState({ isLoading: false, groupActive: groups[0] });
      });
  }

  handleClick(type) {
    console.log("chartReference", this.chart.current);
/*     this.chart.current.remove();
 */    console.log("chartReference", this.chart.current);
    const groupFilter = groups.find(group => {
      return group.type === type;
    });
    this.setState({ groupActive: groupFilter });
  }

  render() {
    return (
      <Card>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {groups.map(
            group => (
              console.log(group),
              (
                <Button onClick={() => this.handleClick(group.type)}>
                  {group.type}
                </Button>
              )
            )
          )}
        </div>
        {this.state.groupActive.strategies.length !== 0 ? (
          <Line
            ref={this.chart}
            groups={groups}
            groupActive={this.state.groupActive.type}
          />
        ) : null}
      </Card>
    );
  }
}
