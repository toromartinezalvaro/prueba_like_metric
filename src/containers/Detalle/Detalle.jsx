import React, { Component } from "react";
import Pie from "../../components/Detalle/pie/Pie";
import Inmueble from "../../components/Detalle/Inmueble/Inmueble";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import styles from "../Detalle/Detalle.module.scss"

export default class Detalle extends Component {

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <p>Inmuebles</p>
          </CardHeader>
          <CardBody>
            <Inmueble/>
            <h1>Areas</h1>
            <div className={styles.Container}>
              <Pie />
              <Pie />
            </div>
            <Inmueble></Inmueble>
          </CardBody>
        </Card>
      </div>
    );
  }
}
