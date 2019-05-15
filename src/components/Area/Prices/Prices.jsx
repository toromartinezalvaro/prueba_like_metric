import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import Table from "../../UI/Table/Table";
import Input from "../../UI/Input/Input";

const prices = ({ areaTypeId, measurementUnit, services }) => {

  const [areas, setAreas] = useState([]);
  const [prices, setPrices] = useState([]);
  const updateAreaPrice = (id, price) => {
    services
      .putAreaPrice(id, {
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
    services
      .putAreaTypePrice(id, {
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
    services
      .getPrices(1, areaTypeId)
      .then(res => {
        if (res.data.length > 0) {
          res.data = _.sortBy(res.data, o => o.measure);

          if (res.data[0].measurementUnit === "UNIDAD") {
            setPrices([res.data[0].price]);
          } else {
            const areas = [];
            const prices = res.data.map(area => {
              areas.push(area.measure);
              return [
                <Input
                  mask="currency"
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
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <Fragment>
      {prices.length === 0 ? (
        <div>No se han ingresado areas</div>
      ) : measurementUnit === "MT2" ? (
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
              value={prices[0]}
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
