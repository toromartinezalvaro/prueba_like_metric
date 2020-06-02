import React, { useState } from 'react';
import Select from 'react-select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Table from '../UI/Table/Table';
import Button from '../UI/Button/Button';
import QualitativePrimes from './QualitativePrimes';
import Styles from './Location.module.scss';

const Locations = (props) => {
  const [
    qualitativePrimesModalState,
    setQualitativePrimesModalState,
  ] = useState(false);

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

      <Dialog
        open={qualitativePrimesModalState}
        scroll="body"
        maxWidth="lg"
        classes={{ root: Styles.modal }}
        fullScreen
      >
        <DialogTitle id="scroll-dialog-title">
          <div className={Styles.title}>
            <span> Primas cualitativas</span>
            <Button
              onClick={changeModalState}
              color="primary"
              className={Styles.button}
            >
              <i className="fas fa-times"></i>
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <QualitativePrimes
            towerId={props.towerId}
            headers={props.headers}
            floorsNames={props.floorsNames}
            changeModalState={changeModalState}
            reloadPrimes={props.reloadPrimes}
            alertHandler={props.alertHandler}
            lowestFloor={props.lowestFloor}
            disabledProp={props.disabledProp}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={changeModalState}
            isDisabled={props.disabledProp}
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Locations;
