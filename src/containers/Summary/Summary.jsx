import React, { Component } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";

class Summary extends Component {
  state = {};
  render() {
    return (
      <Card>
        <CardHeader>
          <p>Entendido</p>
        </CardHeader>
        <CardBody>
          <SummaryTable
            title="Areas"
            intersect="Areas"
            headers={[]}
            columns={[]}
            data={[[]]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default Summary;
