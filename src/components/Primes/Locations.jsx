import React from "react";
import Card, { CardHeader, CardBody } from "../UI/Card/Card";
import Table from "../UI/Table/Table";

const locations = props => {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex" }}>
          <p>Primas por Ubicación</p>
          <select
            onChange={event => {
              props.unitHandler("LCT", event.target.value);
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
          intersect="Primas"
          headers={props.headers}
          columns={props.floorsNames}
          data={props.prices}
        />
      </CardBody>
    </Card>
  );
};

export default locations;
