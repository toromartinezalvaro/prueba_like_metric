import React, { useState } from 'react';
import Select from 'react-select';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Table from '../UI/Table/Table';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import QualitativePrimes from './QualitativePrimes';

const Locations = (props) => {
  const [
    qualitativePrimesModalState,
    setQualitativePrimesModalState,
  ] = useState(true);

  const changeModalState = () => {
    setQualitativePrimesModalState(!qualitativePrimesModalState);
  };

  return (
    <React.Fragment>
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
            <div style={{ marginLeft: 'auto', marginRight: 0 }}>
              <Button onClick={changeModalState}>Primas cualitativas</Button>
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
      <Modal
        style={{ height: '90vh', width: '80vw' }}
        title="Primas cualitativas"
        hidden={qualitativePrimesModalState}
        onConfirm={changeModalState}
        basic
      >
        <QualitativePrimes
          towerId={props.towerId}
          headers={props.headers}
          floorsNames={props.floorsNames}
          changeModalState={changeModalState}
          reloadPrimes={props.reloadPrimes}
          alertHandler={props.alertHandler}
        />
      </Modal>
    </React.Fragment>
  );
};

export default Locations;
