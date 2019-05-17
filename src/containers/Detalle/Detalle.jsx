import React, { Component } from "react";
import Pie from "../../components/Detalle/pie/Pie";
import Inmueble from "../../components/Detalle/Inmueble/Inmueble";
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
        </Card>
      </div>
    );
  }
}
