import React, { Component } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Collapsible from "react-collapsible";

class Summary extends Component {
  state = {};
  render() {
    return (
      <Card>
        <CardHeader>
          <p>Entendido</p>
        </CardHeader>
        <CardBody>
          
          <Collapsible trigger="Texto">
            que tengo que hacer
          </Collapsible>
        </CardBody>
      </Card>
    );
  }
}

export default Summary;
