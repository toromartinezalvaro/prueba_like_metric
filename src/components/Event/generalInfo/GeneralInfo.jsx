import React, { useState, Fragment, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
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
import moment from 'moment';
import styles from './GeneralInfo.module.scss';

const GeneralInfo = ({ schedule }) => {
  const [generalInformation, setGeneralInformation] = useState({
    title: '',
    displacement: 0,
    date: '',
    description: '',
  });

  const [tag, setTag] = useState({
    name: '',
    date: new Date(),
  });

  const [canDisplace, setCanDisplace] = useState(false);

  const [dateValue, setDateValue] = useState([]);

  const [uniqueDate, setuniqueDate] = useState(false);

  const onChangeText = (name) => (e) => {
    setGeneralInformation({ ...generalInformation, [name]: e.target.value });
  };

  const displacementForDate = (name) => (e) => {
    console.log(generalInformation.date);
    const updateDate = moment(generalInformation.date)
      .add(Number(e.target.value), 'M')
      .toDate()
      .getTime();
    setGeneralInformation({
      ...generalInformation,
      [name]: e.target.value,
    });

    console.log('La fecha', updateDate, Number(e.target.value));
  };

  const handleChangeUniqueDate = (e) => {
    if (e.value === 1) {
      setuniqueDate(true);
      setCanDisplace(false);
    } else {
      setGeneralInformation({
        ...generalInformation,
        title: e.label,
        date: e.value,
      });
      setuniqueDate(false);
      setCanDisplace(true);
      console.log(generalInformation);
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

  useEffect(() => {
    setDateValue([
      { value: 1, label: 'FECHA UNICA' },
      {
        value: Number(schedule.salesStartDate),
        label: `FECHA INICIO PROYECTO (${moment(
          Number(schedule.salesStartDate),
        ).format('DD/MM/YYYY')})`,
      },
      {
        value: Number(schedule.endOfSalesDate),
        label: `FECHA FIN PROYECTO (${moment(
          Number(schedule.endOfSalesDate),
        ).format('DD/MM/YYYY')})`,
      },
      {
        value: Number(schedule.balancePointDate),
        label: `FECHA PUNTO DE EQUILIBRIO (${moment(
          Number(schedule.balancePointDate),
        ).format('DD/MM/YYYY')})`,
      },
      {
        value: Number(schedule.constructionStartDate),
        label: `FECHA INICIO DE CONSTRUCCIÓN (${moment(
          Number(schedule.constructionStartDate),
        ).format('DD/MM/YYYY')})`,
      },
      {
        value: Number(schedule.averageDeliveryDate),
        label: `FECHA PROMEDIO DE ENTREGAS (${moment(
          Number(schedule.averageDeliveryDate),
        ).format('DD/MM/YYYY')})`,
      },
    ]);
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
              label: 'fecha',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Seleccione una Fecha"
            options={dateValue}
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
          {canDisplace ? (
            <TextField
              required
              fullWidth
              className={styles.displacement}
              label="Desplazamiento"
              value={generalInformation.displacement}
              variant="outlined"
              onChange={displacementForDate('displacement')}
            />
          ) : null}
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
