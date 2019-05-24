import React, { Component } from "react";
import Pie from "../../components/Detail/pie/Pie";
import Property from "../../components/Detail/Property/Property";
import Insights from "../../components/Detail/Insights/Insights";
import Aditionals from "../../components/Detail/Aditionals/Aditionals";
import DetailServices from "../../services/detail/DetailServices";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detail/Detail.module.scss";
import variables from "../../assets/styles/variables.scss";
import Table from "../../components/UI/Table/Table";
import NumberFormat from "react-number-format";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new DetailServices(this);
  }

  state = {
    properties: [],
    property: {},
    property2: {},
    totals: {},
    totals2: {},
    areas: [],
    aditionals: [],
    areas2: [],
    aditionals2: [],
    style: {},
    active: 0,
    active2: 0,
    id: 0,
    id2: 0
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
          totals: response.data[0].totals,
          areas: response.data[0].areas.filter(
            ({ areaType }) => areaType.unit === "MT2"
          ),
          aditionals: response.data[0].areas.filter(
            ({ areaType }) => areaType.unit === "UNT"
          ),
          id: response.data[0].id
        });
      }
      // console.log("response -->" + data.totals.priceArea)
      // console.log("response -->" + this.state.property.totals);
    });
  };

  formatPrice = value => {
    return <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />;
  };

  printAditionals = data => {
    return data.map(aditional => {
      return (
        console.log(aditional),
        (
          <Aditionals
            Titulo={aditional.areaType.name}
            Titulo1="Cantidad"
            Titulo2="Precio"
            Titulo3="Aditionals"
            Value1={aditional.measure}
            Value2={this.formatPrice(aditional.price)}
            Value3={this.formatPrice(aditional.unitPrice)}
          />
        )
      );
    });
  };

  cells = properties => {
    return properties.map(property => {
      const handleOnClick = () => {
        if (
          this.state.id2 !== property.id &&
          this.state.id !== property.id &&
          this.state.id !== 0
        ) {
          return this.setState({
            id2: property.id,
            active2: 1,
            property2: property,
            totals2: property.totals,
            areas2: property.areas.filter(
              ({ areaType }) => areaType.unit === "MT2"
            ),
            aditionals2: property.areas.filter(
              ({ areaType }) => areaType.unit === "UNT"
            )
          });
        } else if (
          this.state.id2 === property.id &&
          this.state.id !== Property.id
        ) {
          return this.setState({ id2: 0, active2: 0 });
        }
        if (
          (this.state.id !== property.id && this.state.active2 === 0) ||
          this.state.id === 0
        ) {
          return this.setState({
            property: property,
            totals: property.totals,
            areas: property.areas.filter(
              ({ areaType }) => areaType.unit === "MT2"
            ),
            aditionals: property.areas.filter(
              ({ areaType }) => areaType.unit === "UNT"
            ),
            id: property.id
          });
        } else {
          return this.setState({ id: 0 });
        }
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
          <CardBody style={{margin: "0"}}>
            <div className={styles.Row}>
              {this.cells(this.state.properties)}
            </div>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader>
            <p>Valores</p>
          </CardHeader>
          <CardBody>
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
              <Insights
                title="Inmueble"
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
        </Card> */}
        {this.state.id !== 0 || this.state.id2 !==0 ?
        <div
          style={
            this.state.id2 !== 0 && this.state.id !== 0
              ? { display: "flex", flexWrap: "wrap" }
              : { display: "flex" }
          }
        >
                  {this.state.id !== 0 ? (

          <div>
            <Card>
              <CardHeader>
                <p>Areas</p>
              </CardHeader>
              <CardBody style={{margin: "0"}}>
                <Pie
                  areas={this.state.areas}
                  nomenclature={this.state.property.nomenclature}
                />
                {/*  <Table
                  intersect={"Areas"}
                  headers={[""]}
                  columns={["Precio"]}
                  data={[]}
                /> */}
              </CardBody>
            </Card>
                  </div> ): null}
          {this.state.active2 !== 0 ? (
            <div style={{display: "flex"}}>
              <Card>
                <CardHeader>
                  <p>Areas</p>
                </CardHeader>
                <CardBody style={{margin: "0"}}>
                  <Pie
                    areas={this.state.areas2}
                    nomenclature={this.state.property2.nomenclature}
                  />
                  {/*  <Table
                intersect={"Areas"}
                headers={[""]}
                columns={["Precio"]}
                data={[]}
              /> */}
                </CardBody>
              </Card>
            </div>
          ) : null}
                            {this.state.id !== 0 ? (

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
                  Value1={this.state.totals.quantityAditionals}
                  Value2={this.formatPrice(this.state.totals.pricexUnit)}
                  Value3={this.formatPrice(this.state.totals.priceAditionals)}
                />
              </CardBody>
            </Card>
          </div>) : null }
          {this.state.active2 !== 0 ? (
            <div style={{ display: "flex" }}>
              <Card>
                <CardHeader>
                  <p>Adicionales</p>
                </CardHeader>
                <CardBody>
                  {this.printAditionals(this.state.aditionals2)}

                  <Aditionals
                    Titulo="Total"
                    Titulo1="Cantidad"
                    Titulo2="Promedio"
                    Titulo3="Total"
                    Value1={this.state.totals2.quantityAditionals}
                    Value2={this.formatPrice(this.state.totals2.pricexUnit)}
                    Value3={this.formatPrice(this.state.totals2.priceAditionals)}
                  />
                </CardBody>
              </Card>
            </div>
          ) : null}
        </div> : null }
      </div>
    );
  }
}
