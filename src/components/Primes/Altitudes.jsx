import React from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";

const altitudes = props => {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex" }}>
          <p>Primas por altura</p>
          <select
            onChange={event => {
              props.unitHandler("ALT", event.target.value);
            }}
            value={props.unit.code}
          >
            <option value="UNT">Unidad</option>
            <option value="MT2">m²</option>
          </select>
        </div>
      </CardHeader>
      <CardBody>
        <Table
          intersect="primas"
          headers={[`Precio (${props.unit.value})`]}
          columns={props.floorsNames}
          data={props.prices}
        />
      </CardBody>
    </Card>
  );
};

export default altitudes;
