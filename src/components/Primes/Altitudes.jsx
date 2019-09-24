import React from 'react';
import Select from 'react-select';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';

const altitudes = (props) => {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex' }}>
          <p>Primas por altura</p>
          <div
            style={{
              width: '200px',
              marginLeft: '15px',
              zIndex: '9999',
            }}
          >
            <Select
              onChange={(value) => {
                props.unitHandler('ALT', value.value);
              }}
              value={{ value: props.unit.code, label: props.unit.value }}
              options={[
                { value: 'UNT', label: 'Unidad' },
                { value: 'MT2', label: 'm²' },
              ]}
            />
          </div>
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
