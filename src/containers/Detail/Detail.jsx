import React, { Component } from "react";
import Pie from "../../components/Detail/pie/Pie";
import Property from "../../components/Detail/Property/Property";
import Insights from "../../components/Detail/Insights/Insights";
import Aditionals from "../../components/Detail/Aditionals/Aditionals";
import data from "../../test/stubs/summary.service.json";
import DetailServices from "../../services/detail/DetailServices";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detail/Detail.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new DetailServices(this);
  }

  state = {
    properties: [],
    priceArea: 0,
    priceAditionals: 0,
    priceWithAditionals: 0,
    mts2: 0,
    pricexMts2: 0,
    areas: [],
    aditionals: [],
    quantityAditionals: 0,
    pricexUnit: 0,
    show: 0
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    this.services.getDetails().then(response => {
      if (response.data.length !== 0) {
        this.setState({
          properties: response.data,
          priceArea: response.data[0].totals.priceArea,
          priceAditionals: response.data[0].totals.priceAditionals,
          priceWithAditionals: response.data[0].totals.priceWithAditionals,
          mts2: response.data[0].totals.mts2,
          pricexMts2: response.data[0].totals.pricexMts2,
          areas: response.data[0].areas.filter(
            ({ areaType }) => areaType.unit === "MT2"
          ),
          aditionals: response.data[0].areas.filter(
            ({ areaType }) => areaType.unit === "UNT"
          ),
          quantityAditionals: response.data[0].totals.quantityAditionals,
          pricexUnit: response.data[0].totals.pricexUnit
        });
      }
      // console.log("response -->" + data.totals.priceArea)
      console.log("response -->" + this.state.areas);
    });
  };

  printAditionals =   data => {
    return data.map(aditional => {
      return (
        console.log(aditional),
        <Aditionals
          Titulo={aditional.areaType.name}
          Titulo1="Cantidad"
          Titulo2="Precio"
          Titulo3="Aditionals"
          Value1={aditional.measure}
          Value2={"$" + aditional.price}
          Value3={"$" + aditional.unitPrice}
        />
      );
    });
  };

  cells = properties => {
    return properties.map(property => {
      const handleOnClick = () => {
        this.setState({
          priceArea: property.totals.priceArea,
          priceAditionals: property.totals.priceAditionals,
          priceWithAditionals: property.totals.priceWithAditionals,
          mts2: property.totals.mts2,
          pricexMts2: property.totals.pricexMts2,
          areas: property.areas.filter(
            ({ areaType }) => areaType.unit === "MT2"
          ),
          aditionals: property.areas.filter(
            ({ areaType }) => areaType.unit === "UNT"
          ),
          quantityAditionals: property.totals.quantityAditionals,
          pricexUnit: property.totals.pricexUnit
        })
      };
      return (
        <div key={property.nomenclature} onClick={handleOnClick}>
          <Property property={property} />
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
          <CardBody>
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
                value={"$" + this.state.priceArea}
                color="#D62839"
                icon="fas fa-building"
              />
              <Insights
                title="Adicionales"
                value={"$" + this.state.priceAditionals}
                color="#E39774"
                icon="fas fa-plus"
              />
              <Insights
                title="Total"
                value={"$" + this.state.priceWithAditionals}
                color="#A2C3A4"
                icon="fas fa-money-bill-wave"
              />
              <Insights
                title="Area total"
                value={this.state.mts2 + " mt2"}
                color="#80A4ED"
                icon="fas fa-chart-area"
              />
              <Insights
                title="Valor por mt2"
                value={"$" + this.state.pricexMts2}
                color="#B68CB8"
                icon="fas fa-tags"
              />
            </div>
          </CardBody>
        </Card>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <Card>
              <CardHeader>
                <p>Areas</p>
              </CardHeader>
              <CardBody>
                <Pie areas={this.state.areas} />
              </CardBody>
            </Card>
          </div>
          <div style={{ display: "flex" }}>
            <Card>
              <CardHeader>
                <p>Adicionales</p>
              </CardHeader>
              <CardBody>
                {this.printAditionals(this.state.aditionals)}

                <Aditionals
                  Titulo="Total"
                  Titulo1="Cantidad"
                  Titulo2="Promedio"
                  Titulo3="Total"
                  Value1={this.state.quantityAditionals}
                  Value2={"$" + this.state.pricexUnit}
                  Value3={"$" + this.state.priceAditionals}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
