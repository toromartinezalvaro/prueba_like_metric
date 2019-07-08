import React, { Component } from "react";
import Insights from "../../components/Detail/Insights/Insights";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import DetailServices from "../../services/detail/DetailServices";
import Property from "../../components/Detail/Property/Property";
import variables from "../../assets/styles/variables.scss";
import styles from "../DetailAdmin/DetailAdmin.module.scss";
import NumberFormat from "react-number-format";
import Additional from "../../components/Detail/Aditionals/Aditionals";
import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

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
      priceAdditional: 0,
      priceWithAdditional: 0,
      mts2: 0,
      priceXMts2: 0
    },
    additional: [],
    id: 0
  };

  componentDidMount() {
    this.getDetails();
  }

  formatPrice = value => {
    return (
      <NumberFormat
        value={Number(value.toFixed(3))}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    );
  };

  printAdditional = data => {
    return data.map(additional => {
      return (
        <Additional
          Title={additional.areaType.name}
          Title1="Cantidad"
          Title2="Precio"
          Title3="Adicionales"
          Value1={additional.measure}
          Value2={this.formatPrice(additional.price)}
          Value3={this.formatPrice(additional.unitPrice)}
        />
      );
    });
  };

  getDetails = () => {
    const towerId = this.props.match.params.towerId;
    console.log("towerID ->> ", towerId);
    if (!towerId) {
      return;
    }
    console.log("towerID ->> ", towerId);
    this.services.getDetails(towerId).then(response => {
      if (response.data.length !== 0) {
        this.setState({
          properties: response.data,
          property: response.data[0],
          totals: response.data[0].totals,
          additional: response.data[0].areas.filter(
            ({ areaType }) => areaType.unit === "UNT"
          )
        });
      }
    });
  };

  cells = properties => {
    return properties.map(property => {
      const handleOnClick = () => {
        return this.setState({
          property: property,
          totals: property.totals,
          additional: property.areas.filter(
            ({ areaType }) => areaType.unit === "UNT"
          ),
          id: property.id
        });
      };
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
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <Card>
              <CardHeader>
                <p>Valores</p>
              </CardHeader>
              <CardBody>
                <div style={{ display: "flex", flexFlow: "row wrap" }}>
                  <Insights
                    title="Inmueble"
                    value={this.formatPrice(this.state.totals.priceArea)}
                    color="#D62839"
                    icon="fas fa-building"
                  />
                  <Insights
                    title="Adicionales"
                    value={this.formatPrice(this.state.totals.priceAdditional)}
                    color="#E39774"
                    icon="fas fa-plus"
                  />
                  <Insights
                    title="Total"
                    value={this.formatPrice(
                      this.state.totals.priceWithAdditional
                    )}
                    color="#A2C3A4"
                    icon="fas fa-money-bill-wave"
                  />
                  <Insights
                    title="Area total"
                    value={
                      <NumberFormat
                        value={Number(this.state.totals.mts2.toFixed(3))}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" MT2"}
                      />
                    }
                    color="#80A4ED"
                    icon="fas fa-chart-area"
                  />
                  <Insights
                    title="Valor por mt2"
                    value={this.formatPrice(this.state.totals.priceXMts2)}
                    color="#B68CB8"
                    icon="fas fa-tags"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          <div style={{ display: "flex" }}>
            <Card>
              <CardHeader>Adicionales</CardHeader>
              <CardBody>{this.printAdditional(this.state.additional)}</CardBody>
            </Card>
          </div>
        </div>
        <FloatingButton
            route="summary"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Resumen
          </FloatingButton>
      </div>
    );
  }
}
