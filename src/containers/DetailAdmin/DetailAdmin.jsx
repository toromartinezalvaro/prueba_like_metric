import React, { Component } from "react";
import Pie from "../../components/Detail/pie/Pie";
import Property from "../../components/Detail/Property/Property";
import Additional from "../../components/Detail/Aditionals/Aditionals";
import Totals from "../../components/Detail/Totals/Totals";
import DetailServices from "../../services/detail/DetailServices";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../DetailAdmin/DetailAdmin.module.scss";
import variables from "../../assets/styles/variables.scss";
import Table from "../../components/UI/Table/Table";
import NumberFormat from "react-number-format";
import errorHandling from "../../services/commons/errorHelper";
import Error from "../../components/UI/Error/Error";
import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

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
    additional: [],
    areas2: [],
    additional2: [],
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
        additional: data[0].areas.filter(
          ({ areaType }) => areaType.unit === "UNT"
        )
      });
      this.assignTableData();
      this.setState({ isLoading: false });
    }
  };

  sortData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.areaType.id);
      const bInt = parseInt(b.areaType.id);
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

  printAdditional = data => {
    return data.map(aditional => {
      return (
        <Additional
          Title={aditional.areaType.name}
          Title1="Cantidad"
          Title2="Precio"
          Title3="Adicionales"
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
              additional2: property.areas.filter(
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
            additional: property.areas.filter(
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
                    {this.printAdditional(this.state.additional)}
                    <Additional
                      Title="Total"
                      Title1="Cantidad"
                      Title2="Promedio"
                      Title3="Total"
                      Value1={this.state.totals.quantityAdditional}
                      Value2={this.formatPrice(this.state.totals.priceXUnit)}
                      Value3={this.formatPrice(
                        this.state.totals.priceAdditional
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
                    {this.printAdditional(this.state.additional2)}

                    <Additional
                      Title="Total"
                      Title1="Cantidad"
                      Title2="Promedio"
                      Title3="Total"
                      Value1={this.state.totals2.quantityAdditional}
                      Value2={this.formatPrice(this.state.totals2.priceXUnit)}
                      Value3={this.formatPrice(
                        this.state.totals2.priceAdditional
                      )}
                    />
                  </CardBody>
                </Card>
              </div>
            ) : null}
          </div>
        ) : null}
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
