import React, { Component } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";
import SummaryServices from "../../services/summary/SummaryService";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.services = new SummaryServices(this);
  }

  state = {
    areas: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]]
    },
    pricesWithAdditions: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]]
    },
    pricePerMT2WithAdditions: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]]
    },
    propertiesPrices: {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      rack: [[{}]]
    },
    pricePerMT2: {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      rack: [[{}]]
    }
  };

  componentDidMount() {
    this.services
      .getSummaries("ff234f80-7b38-11e9-b198-3de9b761aac6")
      .then(response => {
        const data = response.data;
        this.setState({
          areas: data.areas,
          pricesWithAdditions: data.pricesWithAdditions,
          pricePerMT2WithAdditions: data.pricePerMT2WithAdditions,
          propertiesPrices: data.propertiesPrices,
          pricePerMT2: data.pricePerMT2,
        });
      });
  }

  getAreas = (rack, key) =>
    rack.map(row => row.map(value => <div>{value[key]}</div>));

  render() {
    return (
      <Card>
        <CardHeader>
          <p>Entendido</p>
        </CardHeader>
        <CardBody>
          <SummaryTable
            title="Areas"
            intersect="Areas"
            headers={["1", "2", "3", "4"]}
            columns={["1", "2", "3", "4"]}
            data={this.getAreas(this.state.areas.rack, "area")}
          />
         
        </CardBody>
      </Card>
    );
  }
}

export default Summary;
