import React, { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../UI/Card/Card";
import Table from "../UI/Table/Table";
import Input from "../UI/Input/Input";

const locations = () => {
  const [headers, setHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([[]]);
  
  useEffect(() => {
    const response = [
      [{ id: 1, name: "101", value: null, floor: 1, location: 1 }]
    ];

    setHeaders(["1", "2", "3", "4"]);
    setColumns(["1", "2", "3", "4"]);
    setTableData(response);
  }, []);

  const inputs = () => {
    return tableData.map(element => {
      return element.map(prime => (
        <Input
          style={{ width: "75px", fontSize: "16px" }}
          value={prime.value}
          placeholder={prime.name}
        />
      ));
    });
  };

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
          data={inputs()}
        />
      </CardBody>
    </Card>
  );
};

export default locations;
