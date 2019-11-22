import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Select, { components } from 'react-select';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from '@material-ui/core/CardContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './GeneralInfo.module.scss';

const GeneralInfo = ({ schedule }) => {
  const [generalInformation, setGeneralInformation] = useState({
    title: '',
    displacement: '',
    date: '',
    description: '',
  });

  const [tag, setTag] = useState({
    name: '',
    date: new Date(),
  });

  const [uniqueDate, setuniqueDate] = useState(false);

  const onChangeText = (name) => (e) => {
    setGeneralInformation({ ...generalInformation, [name]: e.target.label });
  };

  const handleChangeUniqueDate = (e) => {
    if (e.value === 1) {
      setuniqueDate(true);
    } else {
      setuniqueDate(false);
    }
  };

  const changeDate = (name) => (e) => {
    if (name === 'date') {
      setTag({ ...tag, [name]: e });
    } else if (name === 'name') {
      setTag({ ...tag, [name]: e.target.value });
    }
  };

  const handleNewTag = (name) => (e) => {};
  let temp = [];

  useEffect(() => {
    if (schedule) {
      temp = [
        { value: 1, label: 'FECHA UNICA' },
        {
          value: 2,
          label: `FECHA INICIO PROYECTO (${schedule.salesStartDate})`,
        },
        { value: 3, label: `FECHA FIN PROYECTO (${schedule.endOfSalesDate})` },
        {
          value: 4,
          label: `FECHA PUNTO DE EQUILIBRIO (${schedule.balancePointDate})`,
        },
        {
          value: 5,
          label: `FECHA INICIO DE CONSTRUCCIÓN (${schedule.constructionStartDate})`,
        },
        {
          value: 6,
          label: `FECHA PROMEDIO DE ENTREGAS (${schedule.averageDeliveryDate})`,
        },
      ];
    }
  });

  const Option = (props) => {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftInformation}>
        <TextField
          required
          fullWidth
          className={styles.item}
          label="Titulo"
          variant="outlined"
          onChange={onChangeText('title')}
        />
        <div className={styles.itemSelect}>
          <Select
            required
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Socio de negocios',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Seleccione una Fecha"
            options={temp}
            onChange={handleChangeUniqueDate}
            components={Option}
          />
        </div>
        <div className={styles.subColumn}>
          {uniqueDate ? (
            <Card className={styles.cardForm}>
              <CardContent>
                <div className={styles.gridSubContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Primera Fecha de Cobro"
                      value={tag.date}
                      onChange={changeDate('date')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <div className={styles.buttonSubColumn}>
                    <Fab
                      color="primary"
                      size="small"
                      aria-label="add"
                      className={styles.fab}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
          <TextField
            required
            fullWidth
            className={styles.displacement}
            label="Desplazamiento"
            variant="outlined"
            onChange={onChangeText('displacement')}
          />
        </div>
      </div>
      <div className={styles.rigthInformation}>
        <TextField
          multiline
          fullWidth
          rows="6"
          className={styles.item}
          label="Descripción/Comentarios"
          variant="outlined"
          onChange={onChangeText('description')}
        />
      </div>
    </div>
  );
};

GeneralInfo.propTypes = {
  handleCloseEvent: PropTypes.func,
  schedule: PropTypes.object,
};

export default GeneralInfo;
