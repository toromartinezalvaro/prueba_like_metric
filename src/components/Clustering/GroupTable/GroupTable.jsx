import React from 'react';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Table from '../../UI/Table/Table';
import Cell from './InfoCell/InfoCell';
import GroupSelect from './GroupSelect/GroupSelect';

const groupTable = ({
  data,
  onTypeChange,
  towerClusterConfig,
  loading,
  ...rest
}) => {
  const getPropertyNames = data => {
    return data.map(property => property.name);
  };

  const getRows = data => {
    return data.map((property, index) => parseToRow(property, index));
  };

  const parseToRow = (property, index) => {
    console.log(property.group === null);
    let value = null;
    if (property.group !== null) value = property.group.id;
    return [
      <Cell>{property.area}</Cell>,
      <Cell>{property.price}</Cell>,
      <Cell>{property.areaGroup}</Cell>,
      <Cell>{property.priceGroup}</Cell>,
      <GroupSelect
        value={value}
        onChange={event => {
          onTypeChange(property.id, event.target.value);
        }}
        groups={towerClusterConfig.groups}
      />
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
            'Area',
            'Precio',
            'Tipo por area',
            'Tipo por precio',
            'Tipo'
          ]}
          columns={getPropertyNames(data)}
          data={getRows(data)}
        />
      </CardBody>
    </Card>
  );
};

export default groupTable;
