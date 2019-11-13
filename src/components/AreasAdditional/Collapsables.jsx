/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 4:27:42 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
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
import Styles from './Collapsables.module.scss';
import Matrix from './Matrix/Matrix';
import Numbers from '../../helpers/numbers';

const Collapsables = (props) => {
  const [activePanel, setActivePanel] = React.useState(null);

  const handleChange = (id) => {
    if (id !== activePanel) {
      setActivePanel(id);
    } else {
      setActivePanel(null);
    }
  };
  return props.data.map((areaType) => {
    let data = Matrix(areaType, props.addAreaAdditionalHandler);
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
                /* onChange={onChangeQuantity}
                 */
                inputProps={{ min: '0' }}
                type="number"
                value={areaType.quantity}
                label="Cantidad"
                margin="normal"
              />
              <FormControl className={Styles.MuiFormControl}>
                <InputLabel>Tipo</InputLabel>
                <Select value={areaType.unit}>
                  <MenuItem value={'MT2'}>Mts²</MenuItem>
                  <MenuItem value={'UNT'}>Unidad</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Table
              intersect={''}
              headers={['Nomenclatura', 'Area', 'Precio x mts2', 'Precio']}
              columnsMinWidth={true}
              columns={[]}
              data={data}
              maxHeight={{ maxHeight: '36vh' }}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });
};

export default Collapsables;
