import React from "react";
import Card, { CardHeader, CardBody } from "../../UI/Card/Card";
import Table from "../../UI/Table/Table";

const groupTable = ({
  data,
  onTypeChange,
  towerClusterConfig,
  loading,
  ...rest
}) => {
  const typeInput = (value, id) => {
    return (
      <select
        value={value}
        onChange={event => {
          onTypeChange(id, event.target.value);
        }}
      >
        {Array(towerClusterConfig.groups)
          .fill()
          .map((_, index) => {
            return (
              <option value={`Tipo ${index + 1}`}>{`Tipo ${index + 1}`}</option>
            );
          })}
      </select>
    );
  };

  const getPropertyNames = data => {
    return data.map(property => property.name);
  };

  const getRows = data => {
    return data.map(property => parseToRow(property));
  };

  const parseToRow = property => {
    return [
      property.area.fixed,
      property.price,
      property.areaGroup,
      property.priceGroup,
      typeInput(
        towerClusterConfig.clusterByArea
          ? property.areaGroup
          : property.priceGroup,
        property.id
      )
    ];
  };

  return (
    <Card loading={loading}>
      <CardHeader>
        <span>Tabla de propiedades</span>
      </CardHeader>
      <CardBody>
        <Table
          intersect="Propiedades"
          headers={[
            "Area",
            "Precio",
            "Tipo por area",
            "Tipo por precio",
            "Tipo"
          ]}
          columns={getPropertyNames(data)}
          data={getRows(data)}
        />
      </CardBody>
    </Card>
  );
};

export default groupTable;
