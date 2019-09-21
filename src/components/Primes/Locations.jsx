import React from 'react';
import Select from 'react-select';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Table from '../UI/Table/Table';

const locations = (props) => {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex' }}>
          <p>Primas por Ubicación</p>
          <div
            style={{
              width: '200px',
              marginLeft: '15px',
              zIndex: '9999',
            }}
          >
            <Select
              onChange={(value) => {
                props.unitHandler('LCT', value.value);
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
