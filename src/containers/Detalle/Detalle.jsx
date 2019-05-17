import React, { Component } from "react";
import Pie from "../../components/Detalle/pie/Pie";
import Inmueble from "../../components/Detalle/Inmueble/Inmueble";
import Insights from "../../components/Detalle/Insights/Insights";
import data from "../../../test/stubs/summary.service.json"

import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detalle/Detalle.module.scss";

export default class Detalle extends Component {
  render() {
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
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <Card>
              <CardHeader>
                <p>Areas</p>
              </CardHeader>
              <CardBody>
                <div className={styles.Container}>
                  <Pie />
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
                <div className={styles.Container}>
                  <Pie />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <Card>
          <CardHeader>Insights</CardHeader>
          <CardBody>
            <div style={{display: "flex"}}>
              <Insights title="Area total" value="153.3"  color="#80A4ED" icon="fas fa-chart-area"/>
              <Insights title="Valor por mt2" value="$1500"  color="#B68CB8"  icon="fas fa-tags"/>
              <Insights title="Valor adicionales" value="$750000"  color="#E39774"  icon="fas fa-plus"/>
              <Insights title="Valor total" value="$2000000" color="#A2C3A4" icon="fas fa-money-bill-wave"/>
            </div>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader>
            <p>Inmuebles</p>
          </CardHeader>
          <CardBody>
            <div className={styles.Container}>
              <div className={styles.Row}>
                <div className={styles.Cell}>Valor total:</div>
                <div className={styles.Cell}>Area total:</div>
              </div>
              <div className={styles.Row}>
                <div className={styles.Cell}>Valor mt2:</div>
                <div className={styles.Cell}>Valor total adicionales:</div>
              </div>
            </div>
          </CardBody>
        </Card> */}
      </div>
    );
  }
}
