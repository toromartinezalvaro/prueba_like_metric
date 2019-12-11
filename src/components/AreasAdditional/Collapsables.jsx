/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 11th December 2019 3:12:33 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import _ from 'lodash';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './Header/Header';
import Actions from './Actions/Actions';
import Table2 from '../UI2/Table';
import EditForm from './EditForm/EditForm';
import Styles from './Collapsables.module.scss';
import Matrix from './Matrix/Matrix';

const COLUMNS_MT2 = [
  { label: 'Nomenclatura', dataKey: 'nomenclature', width: 200 },
  { label: 'Area', dataKey: 'measure', width: 200 },
  { label: 'PrecioXMT2', dataKey: 'price', width: 200 },
  { label: 'Precio', dataKey: 'total', width: 200 },
];

const COLUMNS_UNIT = [
  { label: 'Nomenclatura', dataKey: 'nomenclature', width: 200 },
  { label: 'Precio', dataKey: 'price', width: 200 },
];

const Collapsables = (props) => {
  const [activePanel, setActivePanel] = useState(null);
  const [actualValue, setActualValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState(null);
  const [name, setName] = useState(null);

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

  const handleClickOpen = (e) => {
    e.stopPropagation();
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

    let columns = COLUMNS_MT2;

    if (areaType.unit === 'UNT') {
      data = data.map((property) => {
        return { nomenclature: property.nomenclature, price: property.price };
      });
      columns = COLUMNS_UNIT;
    }

    return (
      <ExpansionPanel
        key={areaType.id}
        expanded={activePanel === areaType.id}
        onChange={() => handleChange(areaType.id)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Header
            areaType={areaType}
            activePanel={activePanel}
            handleClickOpen={handleClickOpen}
            deleteArea={props.deleteArea}
          />
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
                <EditForm
                  onChangeName={onChangeName}
                  unit={unit}
                  handleChangeModal={handleChangeModal}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Actions
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                areaType={areaType}
              />
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
