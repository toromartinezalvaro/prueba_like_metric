import React, { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../UI/Card/Card";
import Table from "../UI/Table/Table";
import Input from "../UI/Input/Input";

const locations = () => {
  useEffect(() => {
    const response = [[{ id: 1, name: "101", floor: 1, location: 1 }]];

    setHeaders(["1", "2", "3", "4"]);
    setColumns(["1", "2", "3", "4"]);
    setData([[]]);
  }, []);

  const [headers, setHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([[]]);

  return (
    <Card>
      <CardHeader>
        <p>Primas por altura</p>
      </CardHeader>
      <CardBody>
        <Table
          intersect="Primas"
          headers={headers}
          columns={columns}
          data={data}
        />
      </CardBody>
    </Card>
  );
};

export default locations;
