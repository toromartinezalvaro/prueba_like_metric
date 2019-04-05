import React from 'react';
import styles from './Schema.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../HOC/Card/Card";
import Input from '../Input/Input';
import Modal from '../UI/Modal/Modal';

const schema = props => {

  const inputValidation = [
    {
      fn: value => {
        const pattern = new RegExp("^[0-9]*$");
        return pattern.test(value);
      },
      message: "Debe ser un numero"
    },
    {
      fn: value => {
        return parseInt(value) >= 1;
      },
      message: "Debe ser mayor o igual a 1"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <p>Esquema</p>
      </CardHeader>
      <CardBody >
        <div className={styles.Container}>
          <div>
            <p className={styles.Label}>Pisos vendibles:</p>
            <Input
              className={styles.Input}
              onChange={props.onFloorsChange}
              value={props.floors}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>

          <div>
            <p className={styles.Label}>Apartamentos:</p>
            <Input
              className={styles.Input}
              onChange={props.onApartmentsChange}
              value={props.apartments}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>

          <div>
            <p className={styles.Label}>Piso mas bajo vendible:</p>
            <Input
              className={styles.Input}
              onChange={props.onLowestFloorChange}
              value={props.lowestFloor}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className={styles.Actions}>
          {props.disable ?
            <button onClick={() => { props.editMode() }}>Editar</button>
            :
            <button onClick={() => { props.update ? props.updateSchema() : props.onSaveSchema() }}>Guardar</button>
          }
        </div>
          <Modal>
            
          </Modal>
      </CardFooter>
    </Card>
  );
}

export default schema;