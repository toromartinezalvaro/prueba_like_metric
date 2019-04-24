import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Table from "../../UI/Table/Table";

const prices = ({ areaTypeId }) => {
  useEffect(() => {
    // Component did mount
    axios
      .get(`http://localhost:1337/areas/1/area-types/133/prices`)
      .then(res => {
        const prices = res.data.map(area => area.price)
        setPrices(prices);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const [prices, setPrices] = useState([]);
  const updateAreaPrice = () => {};

  return (
    <Fragment>
      <h3>{console.log(`Precios: ${prices}`)}</h3>
      <Table
        intersect={"Precios"}
        headers={["Precio"]}
        columns={["403"]}
        data={prices}
      />
    </Fragment>
  );
};

export default prices;
