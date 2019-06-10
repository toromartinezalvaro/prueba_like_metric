import React from "react";
import ClusteringServices from "../../../services/clustering/ClusteringServices";
import Card, { CardHeader, CardBody } from "../../UI/Card/Card";
import Table from "../../UI/Table/Table";

const groupTable = ({ ...rest }) => {
  return (
    <Card>
      <CardHeader>Tabla de propiedades</CardHeader>
      <CardBody>
        <Table intersect="Propiedades" headers={[]} columns={[]} data={[[]]} />
      </CardBody>
    </Card>
  );
};

export default groupTable;
