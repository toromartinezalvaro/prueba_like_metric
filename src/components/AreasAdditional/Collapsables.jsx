/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 28th November 2019 5:13:56 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import _ from 'lodash';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button2 from '../UI/Button/Button';

import Table from '../UI/Table/Table';
import Table2 from '../UI2/Table';

import Styles from './Collapsables.module.scss';
import Matrix from './Matrix/Matrix';

const Collapsables = (props) => {
  const [activePanel, setActivePanel] = React.useState(null);
  const [actualValue, setActualValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [unit, setUnit] = React.useState(null);
  const [name, setName] = React.useState(null);

  const handleChange = (id) => {
    if (id !== activePanel) {
      setActivePanel(id);
    } else {
      setActivePanel(null);
    }
  };

  const actualValueHandler = (value) => {
    setActualValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (id) => {
    if (name && unit) {
      props.updateAreaTypeHandler(unit, name, id);
      setOpen(false);
    }
  };

  const handleChangeModal = (event) => {
    setUnit(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  return props.data.map((areaType, i) => {
    let data = Matrix(
      areaType,
      actualValue,
      props.arrayAreaTypesHandler,
      props.addAreaAdditionalHandler,
      props.updateAreaAdditionalHandler,
      actualValueHandler,
      i,
    );

    const columnsMT2 = [
      { label: 'Nomenclatura', dataKey: 'nomenclature', width: 200 },
      { label: 'Area', dataKey: 'measure', width: 200 },
      { label: 'PrecioXMT2', dataKey: 'price', width: 200 },
      { label: 'Precio', dataKey: 'total', width: 200 },
    ];

    const columnsUnit = [
      { label: 'Nomenclatura', dataKey: 'nomenclature', width: 200 },
      { label: 'Precio', dataKey: 'price', width: 200 },
    ];

    let columns = columnsMT2;

    if (areaType.unit === 'UNT') {
      data = data.map((property) => {
        return { nomenclature: property.nomenclature, price: property.price };
      });
      columns = columnsUnit;
    }

    return (
      <ExpansionPanel
        key={areaType.id}
        expanded={activePanel === areaType.id}
        onChange={() => handleChange(areaType.id)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <span className={Styles.Header}>
            {areaType.name}
            {areaType.id === activePanel && (
              <div className={Styles.ContainerButtons}>
                <div className={Styles.Button}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                  >
                    Editar
                  </Button>
                </div>
                <div className={Styles.Button}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => props.deleteArea(areaType.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            )}
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Editar area'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className={Styles.DialogContainer}>
                  <TextField
                    required
                    onChange={onChangeName}
                    id="standard-required"
                    label="Nombre"
                    margin="normal"
                  />
                  <FormControl required>
                    <InputLabel id="demo-simple-select-required-label">
                      Tipo
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={unit}
                      onChange={handleChangeModal}
                    >
                      <MenuItem value={'MT2'}>mts²</MenuItem>
                      <MenuItem value={'UNT'}>Unidad</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button2 onClick={handleClose} className={Styles.CancelButton}>
                Cancelar
              </Button2>
              <Button2
                onClick={() => handleUpdate(areaType.id)}
                className={Styles.ConfirmButton}
              >
                Editar
              </Button2>
            </DialogActions>
          </Dialog>
          <div className={Styles.Container}>
            <Table2 columns={columns} data={data}></Table2>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });
};

export default Collapsables;
