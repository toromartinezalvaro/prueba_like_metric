import React, { useState, Fragment } from 'react';
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

const GeneralInfo = () => {
  const [generalInformation, setGeneralInformation] = useState({
    title: '',
    type: '',
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
  const temp = [
    { value: 1, label: 'FECHA UNICA' },
    { value: 2, label: 'FECHA INICIO PROYECTO' },
    { value: 3, label: 'FECHA FIN PROYECTO' },
    { value: 4, label: 'FECHA INICIO PREVENTAS' },
    { value: 5, label: 'FECHA PUNTO DE EQUILIBRIO' },
    { value: 6, label: 'FECHA INICIO DE CONSTRUCCIÓN' },
    { value: 7, label: 'FECHA FIN DE CONSTRUCCIÓN' },
    { value: 8, label: 'FECHA PROMEDIO DE ENTREGAS' },
  ];

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
        <TextField
          fullWidth
          className={styles.item}
          label="Tipo de evento"
          variant="outlined"
          onChange={onChangeText('type')}
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
        {uniqueDate ? (
          <Card className={styles.cardForm}>
            <CardContent>
              <TextField
                required
                fullWidth
                className={styles.itemText}
                label="Titulo"
                variant="outlined"
                onChange={changeDate('name')}
              />
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
};

export default GeneralInfo;
