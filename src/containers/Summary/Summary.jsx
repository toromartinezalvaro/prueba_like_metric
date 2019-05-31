import React, { Component } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";
import SummaryCell from "../../components/Summary/SummaryCell/SummaryCell";
import SummaryServices from "../../services/summary/SummaryService";
import Input from "../../components/UI/Input/Input";
import getHeat from "../../components/Summary/HeatMap/HeatMap";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.services = new SummaryServices(this);
  } 

  state = {
    firstFee: 0,
    periods: 1,
    locations: [],
    floors: [],
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
          locations: [...Array(data.totalProperties).keys()].map(o => o + 1),
          floors: [...Array(data.floors).keys()].map(o => o + data.lowestFloor),
          areas: data.areas,
          pricesWithAdditions: data.pricesWithAdditions,
          pricePerMT2WithAdditions: data.pricePerMT2WithAdditions,
          propertiesPrices: data.propertiesPrices,
          pricePerMT2: data.pricePerMT2
        });
        console.log("areas", this.state.areas)
      });
  }

  getData = (summary, key) =>
    summary.rack.map(row =>
      
      row.map(value => (
        <SummaryCell
          k={key}
          style={{
            backgroundColor: getHeat(
              summary.min,
              summary.max,
              summary.avg,
              value,
              key
            )
          }}
        >
          {value}
        </SummaryCell>,
    console.log("summary", summary.rack)

      ))
    );

  firstFeeHandler = target => {
    this.setState({ firstFee: target.value });
  };
  periodsHandler = target => {
    this.setState({ periods: target.value });
  };
  calcFees = () => {
    return this.state.pricesWithAdditions.rack.map(row => {
      return row.map(value => {
        if (value) {
          let newValue = { ...value };
          newValue.price =
            value.price * (this.state.firstFee / 100) * this.state.periods;
          return newValue;
        } else {
          return null;
        }
      });
    });
  };

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
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.areas, "area")}
            stats={[
              { title: "Mínimo", value: this.state.areas.min },
              { title: "Máximo", value: this.state.areas.max },
              { title: "Promedio", value: this.state.areas.avg },
              { title: "Total", value: this.state.areas.sum }
            ]}
          />
          <SummaryTable
            title="Precio con adicionales"
            intersect="Precios"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.pricesWithAdditions, "price")}
            stats={[
              { title: "Mínimo", value: this.state.pricesWithAdditions.min },
              { title: "Máximo", value: this.state.pricesWithAdditions.max },
              { title: "Promedio", value: this.state.pricesWithAdditions.avg },
              { title: "Total", value: this.state.pricesWithAdditions.sum }
            ]}
          />
          {/* <SummaryTable
            title="Valor mes cuota inicial"
            intersect="Precios"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.calcFees(), "price")}
            stats={[
              {
                title: "Cuota inicial",
                value: (
                  <Input
                    validations={[]}
                    onChange={this.firstFeeHandler}
                    value={this.state.firstFee}
                  />
                )
              },
              {
                title: "Credito",
                value: <Input validations={[]} />
              },
              {
                title: "Plazo",
                value: (
                  <Input
                    validations={[]}
                    onChange={this.periodsHandler}
                    value={this.state.periods}
                  />
                )
              }
            ]}
          /> */}
          <SummaryTable
            title="Precio por m² con adicionales"
            intersect="Precios"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.pricePerMT2WithAdditions, "price")}
            stats={[
              {
                title: "Mínimo",
                value: this.state.pricePerMT2WithAdditions.min
              },
              {
                title: "Máximo",
                value: this.state.pricePerMT2WithAdditions.max
              },
              {
                title: "Promedio",
                value: this.state.pricePerMT2WithAdditions.avg
              },
              { title: "Total", value: this.state.pricePerMT2WithAdditions.sum }
            ]}
          />
          <SummaryTable
            title="Precio del inmueble"
            intersect="Precios"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.propertiesPrices, "price")}
            stats={[
              {
                title: "Mínimo",
                value: this.state.propertiesPrices.min
              },
              {
                title: "Máximo",
                value: this.state.propertiesPrices.max
              },
              {
                title: "Promedio",
                value: this.state.propertiesPrices.avg
              },
              { title: "Total", value: this.state.propertiesPrices.sum }
            ]}
          />
          <SummaryTable
            title="Precio por m²"
            intersect="Precios"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.pricePerMT2, "price")}
            stats={[
              {
                title: "Mínimo",
                value: this.state.pricePerMT2.min
              },
              {
                title: "Máximo",
                value: this.state.pricePerMT2.max
              },
              {
                title: "Promedio",
                value: this.state.pricePerMT2.avg
              },
              { title: "Total", value: this.state.pricePerMT2.sum }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default Summary;
