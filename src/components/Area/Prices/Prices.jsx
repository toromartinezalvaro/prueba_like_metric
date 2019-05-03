import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Table from "../../UI/Table/Table";
import Input from "../../UI/Input/Input";

const prices = ({ areaTypeId, measurementUnit }) => {
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

  const updateAreaTypePrice = (id, price) => {
    axios
      .put(`http://localhost:1337/areas/area-types/${id}/prices/`, {
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
      .get(`http://localhost:1337/areas/1/area-types/${areaTypeId}/prices`)
      .then(res => {
        const areas = [];
        const prices =
          res.data[0].measurementUnit === "UNIDAD"
            ? setPrices(res.data[0].price)
            : res.data.map(area => {
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
      <h3>{console.log(`Typo de area: ${measurementUnit}`)}</h3>
      {measurementUnit === "MT2" ? (
        <Table
          intersect={"Areas"}
          headers={["Precio"]}
          columns={areas}
          data={prices}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <div>Precio: </div>
          <div>
            <Input
              onChange={target => {
                updateAreaTypePrice(areaTypeId, target.value);
              }}
              value={prices}
              validations={[]}
              style={{ width: "75px", fontSize: "16px" }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default prices;
