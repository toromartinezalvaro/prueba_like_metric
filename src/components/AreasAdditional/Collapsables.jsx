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
import NumberFormat from 'react-number-format';
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
  const [currentArea, setCurrentArea] = useState(null);

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

  const handleClickOpen = (e, currentAreaPosition) => {
    e.stopPropagation();
    setCurrentArea(currentAreaPosition);
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
            currentAreaPosition={i}
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
                  areaType={props.data[currentArea]}
                  handleChangeModal={handleChangeModal}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Actions
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                areaType={props.data[currentArea]}
              />
            </DialogActions>
          </Dialog>
          <div className={Styles.Container}>
            <div className={Styles.stats}>
              <div className={Styles.stat}>
                <span className={Styles.label}>Unidades:</span>
                <span>{areaType.additionalAreas.length}</span>
              </div>
              <div className={Styles.stat}>
                <span className={Styles.label}>Total:</span>
                <NumberFormat
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  value={areaType.additionalAreas
                    .reduce(
                      (current, next) => current + parseFloat(next.price),
                      0,
                    )
                    .toFixed(2)}
                />
              </div>
              <div className={Styles.stat}>
                <span className={Styles.label}>Precio promedio:</span>
                <NumberFormat
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  value={areaType.additionalAreas
                    .reduce(
                      (current, next) =>
                        current +
                        parseFloat(next.price) / areaType.additionalAreas.length,
                      0,
                    )
                    .toFixed(2)}
                />
              </div>
            </div>

            <Table2 columns={columns} data={data}></Table2>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });
};

export default Collapsables;
