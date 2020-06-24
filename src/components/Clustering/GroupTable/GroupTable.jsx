import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Table from '../../UI/Table/Table';
import Cell from './InfoCell/InfoCell';
import GroupSelect from './GroupSelect/GroupSelect';
import PreventAction from '../PreventAction';

const GroupTable = ({
  data,
  onTypeChange,
  towerClusterConfig,
  loading,
  locked,
  ...rest
}) => {
  const [openActionHandler, setOpenAction] = useState(false);
  const [actionData, setActionData] = useState({});

  const getPropertyNames = (data) => {
    return data.map((property) => property.name);
  };

  const getRows = (data) => {
    return data.map((property, index) => parseToRow(property, index));
  };

  const handleClose = () => {
    setOpenAction(false);
    setActionData({});
  };

  const changeGroupType = (data) => {
    onTypeChange(data.property, data.event);
    handleClose();
  };

  const handleChangeGroup = (property) => (event) => {
    if (property.group.isReset) {
      changeGroupType({ property: property.id, event: event.target.value });
    } else {
      setOpenAction(true);
      setActionData({ property: property.id, event: event.target.value });
    }
  };

  const parseToRow = (property, index) => {
    let value = null;
    if (property.group !== null) value = property.group.id;
    return [
      <Cell locked={locked}>{property.area}</Cell>,
      <Cell locked={locked}>{property.price}</Cell>,
      <Cell locked={locked}>{property.areaGroup}</Cell>,
      <Cell locked={locked}>{property.priceGroup}</Cell>,
      <GroupSelect
        locked={locked}
        value={value}
        onChange={handleChangeGroup(property)}
        groups={towerClusterConfig.groups}
      />,
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
            'Tipo',
          ]}
          columns={getPropertyNames(data)}
          data={getRows(data)}
        />
      </CardBody>
      <PreventAction
        open={openActionHandler}
        handleClose={handleClose}
        action={changeGroupType}
        data={actionData}
      />
    </Card>
  );
};

export default GroupTable;
