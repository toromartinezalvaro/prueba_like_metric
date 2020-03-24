import React from 'react';
import {
  Card,
  Button,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import styles from './Companies.module.scss';
class Companies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Administración de compañías</h1>
        <div className={styles.container}>
          <Card variant="outlined" classes={{ root: styles.cardLeft }}>
            <div className={styles.titleContainer}>
              <h3>Selecciona una de las compañías disponibles</h3>
            </div>
            <FormControl
              variant="outlined"
              classes={{ root: styles.selectController }}
            >
              <InputLabel>Seleccione una compañía</InputLabel>
              <Select></Select>
            </FormControl>
            <div className={styles.actions}>
              <Button classes={{ root: styles.btnStyle }} variant="contained">
                CREAR COMPAÑÍA
              </Button>
              <Button classes={{ root: styles.btnStyle }} variant="contained">
                AGREGAR PROYECTO
              </Button>
            </div>
          </Card>

          <Card variant="outlined" classes={{ root: styles.cardRight }}>
            <div className={styles.titleContainer}>
              <h3>Compañías y Proyectos asociados</h3>
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Companies;
