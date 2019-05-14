import React, { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../UI/Card/Card";
import Table from "../UI/Table/Table";
import Input from "../UI/Input/Input";
import axios from "axios";

const locations = () => {
  const [headers, setHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([[]]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/primes/locations")
      .then(response => {
        setHeaders(
          [...Array(response.data.primes[0].length).keys()].map(o => o + 1)
        );
        setColumns(
          [...Array(response.data.primes.length).keys()].map(
            o => o + response.data.floors
          )
        );
        setTableData(response.data.primes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const priceChangeHandler = (id, price) => {
    axios
      .put(`http://localhost:1337/api/primes/locations/${id}`, { price: price })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const inputs = () => {
    return tableData.map(element => {
      return element.map(prime => (
        <Input
          mask="currency"
          style={{ width: "75px", fontSize: "16px" }}
          value={prime.price}
          validations={[]}
          onChange={target => {
            priceChangeHandler(prime.id, target.value);
          }}
          placeholder={prime.name}
          tooltip={prime.name}
        />
      ));
    });
  };

  return (
    <Card>
      <CardHeader>
        <p>Primas por ubicación</p>
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
