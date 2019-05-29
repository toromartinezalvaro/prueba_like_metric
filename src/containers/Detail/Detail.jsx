import React, { Component } from "react";
import Insights from "../../components/Detail/Insights/Insights";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import DetailServices from "../../services/detail/DetailServices";
import Property from "../../components/Detail/Property/Property";
import variables from "../../assets/styles/variables.scss";
import styles from "../DetailAdmin/DetailAdmin.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new DetailServices(this);
  }
  state = {
    properties: [],
    property: {},
    totals: {
      priceArea: 0,
      priceAditionals: 0,
      priceWithAditionals: 0,
      mts2: 0,
      pricexMts2: 0
    }
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    this.services.getDetails().then(response => {
      if (response.data.length !== 0) {
        this.setState({
          properties: response.data,
          property: response.data[0],
          totals: response.data[0].totals
        });
      }
    });
  };

  cells = properties => {
    return properties.map(property => {
      const handleOnClick = () => {
          return (
            this.setState({
              
              property: property,
              totals: property.totals
            })
          );
        } 
      return (
        <div key={property.nomenclature} onClick={handleOnClick}>
          <Property
            property={property}
            style={
              this.state.id === property.id
                ? { color: "white", backgroundColor: variables.mainColor }
                : this.state.id2 === property.id
                ? { color: "white", backgroundColor: variables.greenColor }
                : {}
            }
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <p>Inmuebles</p>
          </CardHeader>
          <CardBody style={{ margin: "0" }}>
            <div className={styles.Row}>
              {this.cells(this.state.properties)}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <p>Valores</p>
          </CardHeader>
          <CardBody>
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
              <Insights
                title="Inmueble"
                value={"$" + this.state.totals.priceArea}
                color="#D62839"
                icon="fas fa-building"
              />
              <Insights
                title="Adicionales"
                value={"$" + this.state.totals.priceAditionals}
                color="#E39774"
                icon="fas fa-plus"
              />
              <Insights
                title="Total"
                value={"$" + this.state.totals.priceWithAditionals}
                color="#A2C3A4"
                icon="fas fa-money-bill-wave"
              />
              <Insights
                title="Area total"
                value={this.state.totals.mts2 + " mt2"}
                color="#80A4ED"
                icon="fas fa-chart-area"
              />
              <Insights
                title="Valor por mt2"
                value={"$" + this.state.totals.pricexMts2}
                color="#B68CB8"
                icon="fas fa-tags"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
