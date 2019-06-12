import React from 'react';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Table from '../../UI/Table/Table';

const groupTable = ({ data, onTypeChange, ...rest }) => {
  const typeInput = (value, id) => {
    return (
      <select
        value={value}
        onChange={event => {
          onTypeChange(id, event.target.value);
        }}
      >
        <option value="Tipo 1">Tipo 1</option>
        <option value="Tipo 2">Tipo 2</option>
        <option value="Tipo 3">Tipo 3</option>
        <option value="Tipo 4">Tipo 4</option>
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
      property.area,
      property.price,
      property.areaGroup,
      property.priceGroup,
      typeInput(property.areaGroup, property.id),
    ];
  };

  return (
    <Card>
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
            'Tipo',
          ]}
          columns={getPropertyNames(data)}
          data={getRows(data)}
        />
      </CardBody>
    </Card>
  );
};

export default groupTable;
