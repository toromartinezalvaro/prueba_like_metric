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
    prices: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]]
    },
    pricePerMT2: [[]],
    properties: {
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
          prices: data.prices,
          pricePerMT2: data.pricePerMT2,
          properties: data.properties
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
          <SummaryTable
            title="Precios m2 + adicionales"
            intersect="Precio"
            headers={["1", "2", "3", "4"]}
            columns={["1", "2", "3", "4"]}
            data={this.getAreas(this.state.prices.rack, "price")}
          />
          <SummaryTable
            title="Precios m2 + adicionales"
            intersect="Precio"
            headers={["1", "2", "3", "4"]}
            columns={["1", "2", "3", "4"]}
            data={this.getAreas(this.state.prices.rack, "price")}
          />
          <SummaryTable
            title="Precio del inmueble"
            intersect="Precio"
            headers={["1", "2", "3", "4"]}
            columns={["1", "2", "3", "4"]}
            data={this.getAreas(this.state.pricePerMT2, "price")}
          />
          <SummaryTable
            title="Precio por mt2"
            intersect="Precio"
            headers={["1", "2", "3", "4"]}
            columns={["1", "2", "3", "4"]}
            data={this.getAreas(this.state.properties.rack, "price")}
          />
        </CardBody>
      </Card>
    );
  }
}

export default Summary;
