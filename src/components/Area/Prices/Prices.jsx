import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Table from "../../UI/Table/Table";
import Input from "../../UI/Input/Input";

const prices = ({ areaTypeId }) => {
  const [areas, setAreas] = useState([]);
  const [prices, setPrices] = useState([]);
  const updateAreaPrice = (id, price) => {
    axios
      .put(`http://localhost:1337/areas/prices/${id}`, {
        price: price
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Component did mount
    axios
      .get(`http://localhost:1337/areas/1/area-types/133/prices`)
      .then(res => {
        const areas = [];
        const prices = res.data.map(area => {
          areas.push(area.measure);
          return [
            <Input
              onChange={target => {
                updateAreaPrice(area.id, target.value);
              }}
              validations={[]}
              style={{ width: "75px", fontSize: "16px" }}
              value={area.price}
            />
          ];
        });
        setAreas(areas);
        setPrices(prices);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <Fragment>
      <h3>{console.log(`Precios: ${prices}`)}</h3>
      <Table
        intersect={"Precios"}
        headers={["Precio"]}
        columns={areas}
        data={prices}
      />
    </Fragment>
  );
};

export default prices;
