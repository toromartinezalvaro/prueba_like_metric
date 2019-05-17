import React, { Component } from "react";
import Pie from "../../components/Detalle/pie/Pie";
import Inmueble from "../../components/Detalle/Inmueble/Inmueble";
import Insights from "../../components/Detalle/Insights/Insights";
import Adicionales from "../../components/Detalle/Adicionales/Adicionales";
import data from "../../test/stubs/summary.service.json";

import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detalle/Detalle.module.scss";

export default class Detalle extends Component {
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
            <Inmueble />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Insights</CardHeader>
          <CardBody>
            <div style={{ display: "flex" }}>
              <Insights
                title="Inmueble"
                value={data[0].valorSinAdicionales}
                color="#D62839"
                icon="fas fa-building"
              />
              <Insights
                title="Adicionales"
                value={data[0].adicionalesTotal}
                color="#E39774"
                icon="fas fa-plus"
              />

              <Insights
                title="Total"
                value={data[0].valorTotal}
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
                value={data[0].valorXmt2}
                color="#B68CB8"
                icon="fas fa-tags"
              />
            </div>
          </CardBody>
        </Card>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <Card>
              <CardHeader>
                <p>Areas</p>
              </CardHeader>
              <CardBody>
                <div className={styles.Container}>
                  <Pie areas={data[0].areas} />
                </div>
              </CardBody>
            </Card>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Card>
              <CardHeader>
                <p>Adicionales</p>
              </CardHeader>
              <CardBody>
                <Adicionales
                  Titulo={data[0].adicionales[0].tipo}
                  Valor1={data[0].adicionales[0].cantidad}
                  Valor2={data[0].adicionales[0].valor}
                  Valor3={data[0].adicionales[0].total}
                />
                <Adicionales
                  Titulo={data[0].adicionales[1].tipo}
                  Valor1={data[0].adicionales[1].cantidad}
                  Valor2={data[0].adicionales[1].valor}
                  Valor3={data[0].adicionales[1].total}
                />
                <Adicionales
                  Titulo={data[0].adicionales[2].tipo}
                  Valor1={data[0].adicionales[2].cantidad}
                  Valor2={data[0].adicionales[2].valor}
                  Valor3={data[0].adicionales[2].total}
                />
                
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
