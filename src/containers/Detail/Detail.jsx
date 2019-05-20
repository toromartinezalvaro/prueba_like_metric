import React, { Component } from "react";
import Pie from "../../components/Detail/pie/Pie";
import Property from "../../components/Detail/Property/Property";
import Insights from "../../components/Detail/Insights/Insights";
import Aditionals from "../../components/Detail/Aditionals/Aditionals";
import data from "../../test/stubs/summary.service.json";

import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detail/Detail.module.scss";

export default class Detail extends Component {
  
  render() {
    {
      console.log(data);
    }
    return (
      <div>
        <Card>
          <CardHeader>
            <p>Inmuebles</p>
          </CardHeader>
          <CardBody>
            <Property />
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
                value={data[0].valueWithoutAditionals}
                color="#D62839"
                icon="fas fa-building"
              />
              <Insights
                title="Adicionales"
                value={data[0].aditionalsTotal}
                color="#E39774"
                icon="fas fa-plus"
              />
              <Insights
                title="Total"
                value={data[0].valueTotal}
                color="#A2C3A4"
                icon="fas fa-money-bill-wave"
              />
              <Insights
                title="Area total"
                value={data[0].areaTotal}
                color="#80A4ED"
                icon="fas fa-chart-area"
              />
              <Insights
                title="Valor por mt2"
                value={data[0].valueXmt2}
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
                <Pie areas={data[0].areas} />
                <Pie areas={data[0].areas} />

              </CardBody>
            </Card>
          </div>
          <div style={{ display: "flex" }}>
            <Card>
              <CardHeader>
                <p>Adicionales</p>
              </CardHeader>
              <CardBody>
                <Aditionals
                  Titulo={data[0].aditionals[0].type}
                  Titulo1="Cantidad"
                  Titulo2="Precio"
                  Titulo3="Aditionals"
                  Value1={data[0].aditionals[0].quantity}
                  Value2={data[0].aditionals[0].value}
                  Value3={data[0].aditionals[0].total}
                />
                <Aditionals
                  Titulo={data[0].aditionals[1].type}
                  Titulo1="Cantidad"
                  Titulo2="Precio"
                  Titulo3="Aditionals"
                  Value1={data[0].aditionals[1].quantity}
                  Value2={data[0].aditionals[1].value}
                  Value3={data[0].aditionals[1].total}
                />
                <Aditionals
                  Titulo={data[0].aditionals[2].type}
                  Titulo1="Cantidad"
                  Titulo2="Precio"
                  Titulo3="Aditionals"
                  Value1={data[0].aditionals[2].quantity}
                  Value2={data[0].aditionals[2].value}
                  Value3={data[0].aditionals[2].total}
                />
                <Aditionals Titulo="Total" Titulo1="Total" Value1="23000" />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
