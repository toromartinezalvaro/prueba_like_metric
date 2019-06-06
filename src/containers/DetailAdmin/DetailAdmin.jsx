import React, { Component } from "react";
import Pie from "../../components/Detail/pie/Pie";
import Property from "../../components/Detail/Property/Property";
import Aditionals from "../../components/Detail/Aditionals/Aditionals";
import Totals from "../../components/Detail/Totals/Totals";
import DetailServices from "../../services/detail/DetailServices";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../DetailAdmin/DetailAdmin.module.scss";
import variables from "../../assets/styles/variables.scss";
import Table from "../../components/UI/Table/Table";
import NumberFormat from "react-number-format";
import errorHandling from "../../services/commons/errorHelper";
import Error from "../../components/UI/Error/Error";

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
    areasTable: {
      nameAreas: [],
      priceAreas: []
    },
    areasTable2: {
      nameAreas: [],
      priceAreas: []
    },
    style: {},
    active: 0,
    active2: 0,
    id: 0,
    id2: 0
  };

  componentDidMount() {
    this.getDetails();
    this.setState({ isLoading: true });
  }

  getDetails = () => {
    const towerId = this.props.match.params.towerId;
    if (!towerId) {
      return;
    }
    this.services
      .getDetails(towerId)
      .then(response => {
        this.assignDefaultValues(response.data);
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  assignDefaultValues = data => {
    if (data.length !== 0) {
      this.setState({
        properties: data,
        property: data[0],
        totals: data[0].totals,
        areas: data[0].areas.filter(({ areaType }) => areaType.unit === "MT2"),
        aditionals: data[0].areas.filter(
          ({ areaType }) => areaType.unit === "UNT"
        )
      });
      this.assignTableData();
      this.setState({ isLoading: false });
    }
  };

  sortData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.id);
      const bInt = parseInt(b.id);
      if (aInt > bInt) return 1;
      if (aInt < bInt) return -1;
      return 0;
    });
  };

  assignTableData = data => {
    if (this.state.areas) {
      let areas = this.sortData(this.state.areas);
      this.setState({
        areasTable: areas.reduce(
          (current, next) => {
            current.nameAreas.push(next.areaType.name);
            current.priceAreas.push(
              <p style={{ alignContent: "center" }}>
                {this.formatPrice(next.price)}
              </p>
            );
            return current;
          },
          {
            nameAreas: [],
            priceAreas: []
          }
        )
      });
    }
  };

  formatPrice = value => {
    return (
      <NumberFormat
        value={value}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    );
  };

  printAditionals = data => {
    return data.map(aditional => {
      return (
        <Aditionals
          Titulo={aditional.areaType.name}
          Titulo1="Cantidad"
          Titulo2="Precio"
          Titulo3="Aditionals"
          Value1={aditional.measure}
          Value2={this.formatPrice(aditional.price)}
          Value3={this.formatPrice(aditional.unitPrice)}
        />
      );
    });
  };

  cells = properties => {
    return properties.map(property => {
      const handleOnClick = () => {
        let areas = this.sortData(property.areas);
        if (
          this.state.id2 !== property.id &&
          this.state.id !== property.id &&
          this.state.id !== 0
        ) {
          return (
            this.setState({
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
            }),
            this.setState({
              areasTable2: areas.reduce(
                (current, next) => {
                  if (next.areaType.unit === "MT2") {
                    current.nameAreas.push(next.areaType.name);
                    current.priceAreas.push(
                      <p style={{ alignContent: "center" }}>
                        {this.formatPrice(next.price)}
                      </p>
                    );
                  }
                  return current;
                },
                {
                  nameAreas: [],
                  priceAreas: []
                }
              )
            })
          );
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
        {this.state.currentErrorMessage !== "" ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
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
        {this.state.id !== 0 || this.state.id2 !== 0 ? (
          <div
            style={
              this.state.id2 !== 0 && this.state.id !== 0
                ? {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: " space-between"
                  }
                : { display: "flex" }
            }
          >
            {this.state.id !== 0 ? (
              <div style={{ display: "flex" }}>
                <Card style={{ marginTop: "0" }}>
                  <CardHeader>
                    <p>Areas {this.state.property.nomenclature}</p>
                  </CardHeader>
                  <CardBody style={{ margin: "0" }}>
                    <Pie
                      property={this.state.property}
                      nomenclature={this.state.property.nomenclature}
                    />

                    <Totals data={this.state.property} />
                    <div
                      style={{
                        marginTop: "10px",
                        overflowX: "auto",
                        maxWidth: "450px"
                      }}
                    >
                      <Table
                        intersect={"Areas"}
                        headers={this.state.areasTable.nameAreas}
                        columns={[
                          <p style={{ alignContent: "center" }}>PrecioxMts2</p>
                        ]}
                        data={[this.state.areasTable.priceAreas]}
                        style={{ padding: "0em 1.5em" }}
                        width={{ width: "100px" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : null}
            {this.state.active2 !== 0 ? (
              <div style={{ display: "flex" }}>
                <Card style={{ marginTop: "0" }}>
                  <CardHeader>
                    <p>Areas {this.state.property2.nomenclature}</p>
                  </CardHeader>
                  <CardBody style={{ margin: "0" }}>
                    <Pie
                      property={this.state.property2}
                      nomenclature={this.state.property2.nomenclature}
                    />
                    <Totals data={this.state.property2} />
                    <div
                      style={{
                        marginTop: "10px",
                        overflowX: "auto",
                        maxWidth: "450px"
                      }}
                    >
                      <Table
                        intersect={"Areas"}
                        headers={this.state.areasTable2.nameAreas}
                        columns={[
                          <p style={{ alignContent: "center" }}>PrecioxMts2</p>
                        ]}
                        data={[this.state.areasTable2.priceAreas]}
                        style={{ padding: "0em 1.5em" }}
                        width={{ width: "100px" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : null}
            {this.state.id !== 0 ? (
              <div
                style={
                  this.state.id !== 0 && this.state.id2 !== 0
                    ? { flexGrow: "1" }
                    : { display: "flex" }
                }
              >
                <Card style={{ marginTop: "0" }}>
                  <CardHeader>
                    <p>Adicionales</p>
                  </CardHeader>
                  <CardBody style={{ margin: "0" }}>
                    {this.printAditionals(this.state.aditionals)}
                    <Aditionals
                      Titulo="Total"
                      Titulo1="Cantidad"
                      Titulo2="Promedio"
                      Titulo3="Total"
                      Value1={this.state.totals.quantityAditionals}
                      Value2={this.formatPrice(this.state.totals.pricexUnit)}
                      Value3={this.formatPrice(
                        this.state.totals.priceAditionals
                      )}
                    />
                  </CardBody>
                </Card>
              </div>
            ) : null}
            {this.state.active2 !== 0 ? (
              <div
                style={
                  this.state.id2 !== 0 && this.state.id !== 0
                    ? { flexGrow: "1" }
                    : { display: "flex" }
                }
              >
                <Card style={{ marginTop: "0" }}>
                  <CardHeader>
                    <p>Adicionales</p>
                  </CardHeader>
                  <CardBody style={{ margin: "0" }}>
                    {this.printAditionals(this.state.aditionals2)}

                    <Aditionals
                      Titulo="Total"
                      Titulo1="Cantidad"
                      Titulo2="Promedio"
                      Titulo3="Total"
                      Value1={this.state.totals2.quantityAditionals}
                      Value2={this.formatPrice(this.state.totals2.pricexUnit)}
                      Value3={this.formatPrice(
                        this.state.totals2.priceAditionals
                      )}
                    />
                  </CardBody>
                </Card>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
