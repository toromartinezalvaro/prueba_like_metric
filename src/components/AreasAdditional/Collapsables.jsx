/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Monday, 18th November 2019 5:36:34 pm
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '../UI/Table/Table';
import Table2 from '../UI2/Table';

import Styles from './Collapsables.module.scss';
import Matrix from './Matrix/Matrix';

const Collapsables = (props) => {
  const [activePanel, setActivePanel] = React.useState(null);
  const [actualValue, setActualValue] = React.useState(null);

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

  return props.data.map((areaType) => {
    let data = Matrix(
      areaType,
      actualValue,
      props.arrayAreaTypesHandler,
      props.addAreaAdditionalHandler,
      props.updateAreaAdditionalHandler,
      actualValueHandler,
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
          <span className={Styles.DeleteButton}>
            {areaType.name}
            {areaType.id === activePanel && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => props.deleteArea(areaType.id)}
              >
                Eliminar
              </Button>
            )}
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={Styles.Container}>
            <div className={Styles.TextFields}>
              <TextField
                inputProps={{ min: '0' }}
                type="number"
                value={areaType.quantity}
                label="Cantidad"
                margin="normal"
                onChange={(e) => {
                  props.arrayAreaTypesHandler(
                    areaType.id,
                    0,
                    'quantity',
                    e.target.value,
                    true,
                  );
                }}
              />
              <FormControl className={Styles.MuiFormControl}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={areaType.unit}
                  onChange={(e) => {
                    props.arrayAreaTypesHandler(
                      areaType.id,
                      0,
                      'unit',
                      e.target.value,
                      true,
                    );
                  }}
                >
                  <MenuItem value={'MT2'}>Mts²</MenuItem>
                  <MenuItem value={'UNT'}>Unidad</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* <Table
              intersect={''}
              headers={['Nomenclatura', 'Area', 'Precio x mts2', 'Precio']}
              columnsMinWidth={true}
              columns={columns}
              data={data}
              maxHeight={{ maxHeight: '36vh' }}
            /> */}
            <Table2 columns={columns} data={data}></Table2>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });
};

export default Collapsables;
